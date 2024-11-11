import React, { useState, useEffect } from 'react';
import { Container, Title, Space, Button, Group, Stack } from '@mantine/core';
import { CacheForm } from '../components/CacheForm';
import { CacheList } from '../components/CacheList';
import { CacheStats } from '../components/CacheStats';
import { EditModal } from '../components/EditModal';

export function CachePage() {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ keys: 0, hits: 0, misses: 0 });
  const [editItem, setEditItem] = useState(null);

  const fetchData = async () => {
    const [statsRes, itemsRes] = await Promise.all([
      fetch('/stats'),
      fetch('/items')
    ]);
    
    const statsData = await statsRes.json();
    const itemsData = await itemsRes.json();
    
    setStats(statsData);
    setItems(itemsData);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (data) => {
    await fetch(`/cache/${data.key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: data.value, ttl: data.ttl }),
    });
    fetchData();
  };

  const handleEdit = async (key, data) => {
    await fetch(`/cache/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    fetchData();
  };

  const handleDelete = async (key) => {
    await fetch(`/cache/${key}`, { method: 'DELETE' });
    fetchData();
  };

  const handleClearAll = async () => {
    await fetch('/cache', { method: 'DELETE' });
    fetchData();
  };

  return (
    <Container size="lg">
      <Stack gap="lg">
        <CacheStats stats={stats} />
        
        <div>
          <Title order={2}>Add New Item</Title>
          <Space h="md" />
          <CacheForm onSubmit={handleSubmit} />
        </div>
        
        <div>
          <Group justify="space-between">
            <Title order={2}>Cached Items</Title>
            <Button color="red" onClick={handleClearAll}>Clear All</Button>
          </Group>
          <Space h="md" />
          <CacheList 
            items={items} 
            onDelete={handleDelete}
            onEdit={setEditItem}
          />
        </div>

        <EditModal
          item={editItem}
          isOpen={!!editItem}
          onClose={() => setEditItem(null)}
          onSave={handleEdit}
        />
      </Stack>
    </Container>
  );
}