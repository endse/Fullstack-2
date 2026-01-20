'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Slider,
  Switch,
  Chip,
  Alert,
  LinearProgress,
  Snackbar,
  Button,
  Box,
  Drawer,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  IconButton,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThermostatIcon from '@mui/icons-material/Thermostat';

export default function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [temperature, setTemperature] = useState(24);
  const [systemOn, setSystemOn] = useState(true);
  const [notify, setNotify] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(4);

  return (
    <>
      {/* APP BAR */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Smart UI Dashboard
          </Typography>

          <Button color="inherit" onClick={() => setDialogOpen(true)}>
            Info
          </Button>
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6">Navigation</Typography>
          <Typography variant="body2" mt={2}>
            Dashboard  
            <br />
            Settings  
            <br />
            Reports
          </Typography>
        </Box>
      </Drawer>

      <Container sx={{ py: 5 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Material UI Advanced Components
        </Typography>

        {/* TABS */}
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label="Controls" />
          <Tab label="Status" />
          <Tab label="Feedback" />
        </Tabs>

        {/* TAB CONTENT */}
        {tab === 0 && (
          <Grid container spacing={4}>
            {/* Temperature */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Temperature Control
                  </Typography>
                  <ThermostatIcon />
                  <Typography>
                    {temperature}°C
                  </Typography>
                  <Slider
                    value={temperature}
                    min={10}
                    max={40}
                    onChange={(_, v) => setTemperature(v as number)}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Power */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Power System
                  </Typography>
                  <Chip
                    label={systemOn ? 'Active' : 'Inactive'}
                    color={systemOn ? 'success' : 'error'}
                    sx={{ mb: 2 }}
                  />
                  <Switch
                    checked={systemOn}
                    onChange={() => setSystemOn(!systemOn)}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {tab === 1 && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Alert severity="info">
                System performance is stable.
              </Alert>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Processing Load
                  </Typography>
                  <LinearProgress sx={{ mt: 2 }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>System Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  CPU Load: Normal  
                  <br />
                  Memory Usage: Optimal  
                  <br />
                  Network: Stable
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        )}

        {tab === 2 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    User Feedback
                  </Typography>
                  <Rating
                    value={rating}
                    onChange={(_, v) => setRating(v)}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Actions
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setNotify(true)}
                  >
                    Send Notification
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>

      {/* SNACKBAR */}
      <Snackbar
        open={notify}
        autoHideDuration={3000}
        onClose={() => setNotify(false)}
        message="Action completed successfully"
      />

      {/* DIALOG */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>About This Dashboard</DialogTitle>
        <DialogContent>
          This application demonstrates advanced Material UI
          components integrated with Next.js.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* FOOTER */}
      <Box sx={{ textAlign: 'center', py: 3, bgcolor: '#f5f5f5' }}>
        <Typography color="text.secondary">
          © 2026 | Advanced MUI Component Dashboard
        </Typography>
      </Box>
    </>
  );
}
