import React, { useState } from 'react';
import { Table, Button, Text, Menu, ActionIcon, Group } from '@mantine/core';
import { IconDots, IconEdit, IconTrash, IconCopy } from '@tabler/icons-react';
import { SearchBar } from './SearchBar';

export function CacheList({ items, onDelete, onEdit }) {
  const [search, setSearch] = useState('');

  const filteredItems = items.filter(item => 
    item.key.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (!items.length) {
    return <Text c="dimmed">No items in cache</Text>;
  }

  return (
    <>
      <SearchBar value={search} onChange={setSearch} />
      <Table mt="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Key</Table.Th>
            <Table.Th>Value</Table.Th>
            <Table.Th>TTL</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredItems.map((item) => (
            <Table.Tr key={item.key}>
              <Table.Td>{item.key}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Text truncate maw={200}>{item.value}</Text>
                  <ActionIcon 
                    size="sm" 
                    variant="subtle"
                    onClick={() => copyToClipboard(item.value)}
                  >
                    <IconCopy size={16} />
                  </ActionIcon>
                </Group>
              </Table.Td>
              <Table.Td>{new Date(item.ttl).toLocaleString()}</Table.Td>
              <Table.Td>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon variant="subtle">
                      <IconDots size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item 
                      leftSection={<IconEdit size={16} />}
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item 
                      leftSection={<IconCopy size={16} />}
                      onClick={() => copyToClipboard(item.value)}
                    >
                      Copy Value
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item 
                      color="red" 
                      leftSection={<IconTrash size={16} />}
                      onClick={() => onDelete(item.key)}
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}