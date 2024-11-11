import React from 'react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CachePage } from './pages/CachePage';
import { MonitorPage } from './pages/MonitorPage';
import { DocsPage } from './pages/DocsPage';
import { Navigation } from './components/Navigation';
import { AppShell, Header, Title } from '@mantine/core';

export function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <AppShell
          header={{ height: 60 }}
          navbar={{ width: 250 }}
          padding="md"
        >
          <AppShell.Header>
            <Header height={60} p="xs" display="flex" style={{ alignItems: 'center' }}>
              <Title order={3}>Cache Manager</Title>
            </Header>
          </AppShell.Header>
          
          <AppShell.Navbar p="md">
            <Navigation />
          </AppShell.Navbar>
          
          <AppShell.Main>
            <Routes>
              <Route path="/" element={<CachePage />} />
              <Route path="/monitor" element={<MonitorPage />} />
              <Route path="/docs" element={<DocsPage />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </BrowserRouter>
    </MantineProvider>
  );
}