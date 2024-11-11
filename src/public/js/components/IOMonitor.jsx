import React from 'react';
import { Table, Text, Badge, ScrollArea } from '@mantine/core';

export function IOMonitor({ operations }) {
  if (!operations.length) {
    return <Text c="dimmed">No operations recorded yet</Text>;
  }

  const getStatusColor = (success) => success ? 'green' : 'red';
  const getOperationColor = (type) => {
    switch (type) {
      case 'SET': return 'blue';
      case 'GET': return 'green';
      case 'DELETE': return 'red';
      default: return 'gray';
    }
  };

  return (
    <ScrollArea h={400}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Time</Table.Th>
            <Table.Th>Operation</Table.Th>
            <Table.Th>Key</Table.Th>
            <Table.Th>Value</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {operations.map((op, index) => (
            <Table.Tr key={index}>
              <Table.Td>{new Date(op.timestamp).toLocaleTimeString()}</Table.Td>
              <Table.Td>
                <Badge color={getOperationColor(op.type)}>{op.type}</Badge>
              </Table.Td>
              <Table.Td>{op.key}</Table.Td>
              <Table.Td>{op.value !== undefined ? JSON.stringify(op.value) : '-'}</Table.Td>
              <Table.Td>
                <Badge color={getStatusColor(op.success)}>
                  {op.success ? 'Success' : 'Failed'}
                </Badge>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}