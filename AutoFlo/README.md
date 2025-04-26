# AutoFlo

![AutoFlo Logo](docs/assets/autoflo-logo.png)

AutoFlo is an open-source platform that combines workflow automation with AI agent orchestration. It integrates n8n-style workflow automation with ActivePieces MCPs and Autogen Studio's AI agent capabilities, all unified with a React Flow visual interface.

## 🚀 Features

- **Visual Workflow Designer**: Create complex workflows with an intuitive drag-and-drop interface
- **AI Agent Integration**: Seamlessly incorporate AI agents from Autogen Studio into your workflows
- **280+ Service Connectors**: Leverage ActivePieces MCPs to connect to hundreds of external services
- **Hybrid Execution**: Combine traditional automation steps with AI agent capabilities
- **Extensible Architecture**: Build custom nodes, agents, and integrations

## 🏗️ Architecture

AutoFlo consists of four main components:

1. **Frontend**: React-based UI with React Flow for visual workflow design
2. **Backend**: Node.js workflow engine with Python-based agent orchestration
3. **Integration Layer**: Adapters for ActivePieces MCPs and Autogen agents
4. **Storage Layer**: Persistent storage for workflows, configurations, and history

For more details, see the [Architecture Documentation](docs/ARCHITECTURE.md).

## 📋 Project Status

AutoFlo is currently in early development. See our [Tasks](TASKS.md) for the current development roadmap.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- Docker and Docker Compose

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/autoflo.git
   cd autoflo
   ```

2. Start the development environment:
   ```bash
   docker-compose up -d
   ```

3. Access the application:
   ```
   Frontend: http://localhost:3000
   API: http://localhost:8000
   ```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## 📜 License

AutoFlo is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- [Autogen](https://github.com/microsoft/autogen) for the AI agent framework
- [ActivePieces](https://github.com/activepieces/activepieces) for the MCP connectors
- [React Flow](https://reactflow.dev/) for the visual workflow designer
- [n8n](https://n8n.io/) for inspiration on workflow automation
