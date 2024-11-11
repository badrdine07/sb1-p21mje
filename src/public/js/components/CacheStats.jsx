import React from 'react';
import { Paper, Group, Text, RingProgress, Stack } from '@mantine/core';

export function CacheStats({ stats }) {
  const hitRate = stats.hits + stats.misses === 0 
    ? 0 
    : (stats.hits / (stats.hits + stats.misses)) * 100;

  return (
    <Paper p="md" withBorder>
      <Group justify="space-between">
        <Stack gap="xs">
          <Text size="lg" fw={500}>Cache Performance</Text>
          <Group>
            <Stack gap={0}>
              <Text c="blue" fw={500}>{stats.keys}</Text>
              <Text size="sm" c="dimmed">Total Keys</Text>
            </Stack>
            <Stack gap={0}>
              <Text c="green" fw={500}>{stats.hits}</Text>
              <Text size="sm" c="dimmed">Cache Hits</Text>
            </Stack>
            <Stack gap={0}>
              <Text c="red" fw={500}>{stats.misses}</Text>
              <Text size="sm" c="dimmed">Cache Misses</Text>
            </Stack>
          </Group>
        </Stack>
        <RingProgress
          size={80}
          thickness={8}
          roundCaps
          sections={[{ value: hitRate, color: 'blue' }]}
          label={
            <Text ta="center" size="xs" fw={500}>
              {hitRate.toFixed(1)}%
              <Text size="xs" c="dimmed">Hit Rate</Text>
            </Text>
          }
        />
      </Group>
    </Paper>
  );
}