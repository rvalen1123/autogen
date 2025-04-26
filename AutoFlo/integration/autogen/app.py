from flask import Flask, request, jsonify
import os
import autogen
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "service": "autogen-integration"})

@app.route('/agents', methods=['GET'])
def list_agents():
    """List available agent types"""
    agent_types = [
        {"id": "assistant", "name": "Assistant", "description": "General purpose assistant agent"},
        {"id": "userproxy", "name": "User Proxy", "description": "User proxy agent for human-in-the-loop interactions"},
        {"id": "groupchat", "name": "Group Chat", "description": "Multi-agent conversation orchestrator"}
    ]
    return jsonify({"agents": agent_types})

@app.route('/agents/execute', methods=['POST'])
def execute_agent():
    """Execute an agent with the provided configuration"""
    data = request.json
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    agent_type = data.get('agent_type')
    prompt = data.get('prompt')
    
    if not agent_type or not prompt:
        return jsonify({"error": "Missing required fields"}), 400
    
    try:
        # Initialize agents based on the agent type
        if agent_type == "assistant":
            # Create an assistant agent
            assistant = autogen.AssistantAgent(
                name="assistant",
                llm_config={"model": "gpt-4"}
            )
            
            # Create a user proxy agent
            user_proxy = autogen.UserProxyAgent(
                name="user_proxy"
            )
            
            # Start the conversation
            user_proxy.initiate_chat(
                assistant,
                message=prompt
            )
            
            # Get the conversation history
            messages = []
            for message in assistant.chat_messages[user_proxy]:
                messages.append({
                    "role": message["role"],
                    "content": message["content"]
                })
            
            return jsonify({
                "success": True,
                "messages": messages
            })
        
        elif agent_type == "groupchat":
            # Create multiple agents for a group chat
            assistant = autogen.AssistantAgent(
                name="assistant",
                llm_config={"model": "gpt-4"}
            )
            
            coder = autogen.AssistantAgent(
                name="coder",
                llm_config={"model": "gpt-4"}
            )
            
            user_proxy = autogen.UserProxyAgent(
                name="user_proxy"
            )
            
            # Create a group chat
            groupchat = autogen.GroupChat(
                agents=[user_proxy, assistant, coder],
                messages=[],
                max_round=10
            )
            
            # Create a group chat manager
            manager = autogen.GroupChatManager(
                groupchat=groupchat,
                llm_config={"model": "gpt-4"}
            )
            
            # Start the conversation
            user_proxy.initiate_chat(
                manager,
                message=prompt
            )
            
            # Get the conversation history
            messages = []
            for message in groupchat.messages:
                messages.append({
                    "role": message["role"],
                    "content": message["content"],
                    "agent": message.get("name", "system")
                })
            
            return jsonify({
                "success": True,
                "messages": messages
            })
        
        else:
            return jsonify({"error": f"Unsupported agent type: {agent_type}"}), 400
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
