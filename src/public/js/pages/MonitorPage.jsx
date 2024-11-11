import React from 'react';
import { Container, Title, Space } from '@mantine/core';
import { IOMonitor } from '../components/IOMonitor';
import { useOperations } from '../hooks/useOperations';

export function MonitorPage() {
  const { operations } = useOperations();

  return (
    <Container size="lg">
      <Title order={2}>I/O Monitor</Title>
      <Space h="md" />
      <IOMonitor operations={operations} />
    </Container>
  );
}