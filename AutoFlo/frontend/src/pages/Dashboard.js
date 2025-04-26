import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  PlayArrow as PlayIcon,
  AccountTree as WorkflowIcon,
  SmartToy as AgentIcon,
  Extension as MCPIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  // Mock data
  const stats = {
    workflows: 5,
    executions: 128,
    agents: 3,
    mcps: 12,
  };

  const recentWorkflows = [
    { id: '1', name: 'Email Processing', lastRun: '2 hours ago', status: 'success' },
    { id: '2', name: 'Customer Support Bot', lastRun: '1 day ago', status: 'success' },
    { id: '3', name: 'Data Sync', lastRun: '3 days ago', status: 'failed' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/workflows/new"
        >
          New Workflow
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Workflows
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WorkflowIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h4" component="div">
                  {stats.workflows}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Executions
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PlayIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h4" component="div">
                  {stats.executions}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Agents
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AgentIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h4" component="div">
                  {stats.agents}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                MCPs Connected
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MCPIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h4" component="div">
                  {stats.mcps}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Workflows */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Recent Workflows
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {recentWorkflows.map((workflow) => (
            <Grid item xs={12} key={workflow.id}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 1,
                  bgcolor: 'background.default',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WorkflowIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="subtitle1">{workflow.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Last run: {workflow.lastRun}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: workflow.status === 'success' ? 'success.main' : 'error.main',
                      mr: 2,
                    }}
                  >
                    {workflow.status.toUpperCase()}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    component={RouterLink}
                    to={`/workflows/${workflow.id}`}
                  >
                    View
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Dashboard;
