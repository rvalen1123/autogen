const express = require('express');
const router = express.Router();

// Mock data for initial development
const workflows = [
  {
    id: '1',
    name: 'Email Processing Workflow',
    description: 'Process incoming emails and categorize them',
    nodes: [],
    edges: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Customer Support Bot',
    description: 'AI-powered customer support workflow',
    nodes: [],
    edges: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Get all workflows
router.get('/', (req, res) => {
  res.json(workflows);
});

// Get workflow by ID
router.get('/:id', (req, res) => {
  const workflow = workflows.find(w => w.id === req.params.id);
  if (!workflow) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  res.json(workflow);
});

// Create new workflow
router.post('/', (req, res) => {
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const newWorkflow = {
    id: (workflows.length + 1).toString(),
    name,
    description: description || '',
    nodes: [],
    edges: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  workflows.push(newWorkflow);
  res.status(201).json(newWorkflow);
});

// Update workflow
router.put('/:id', (req, res) => {
  const { name, description, nodes, edges } = req.body;
  const index = workflows.findIndex(w => w.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  
  const updatedWorkflow = {
    ...workflows[index],
    name: name || workflows[index].name,
    description: description !== undefined ? description : workflows[index].description,
    nodes: nodes || workflows[index].nodes,
    edges: edges || workflows[index].edges,
    updatedAt: new Date()
  };
  
  workflows[index] = updatedWorkflow;
  res.json(updatedWorkflow);
});

// Delete workflow
router.delete('/:id', (req, res) => {
  const index = workflows.findIndex(w => w.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  
  workflows.splice(index, 1);
  res.status(204).send();
});

// Execute workflow
router.post('/:id/execute', (req, res) => {
  const workflow = workflows.find(w => w.id === req.params.id);
  
  if (!workflow) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  
  // Mock execution response
  res.json({
    executionId: `exec-${Date.now()}`,
    status: 'completed',
    workflow: workflow.id,
    startTime: new Date(),
    endTime: new Date(),
    results: {
      success: true,
      output: {
        message: 'Workflow executed successfully'
      }
    }
  });
});

module.exports = router;
