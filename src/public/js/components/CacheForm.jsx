import React, { useState } from 'react';
import { TextInput, NumberInput, Button, Group, Paper } from '@mantine/core';

export function CacheForm({ onSubmit }) {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [ttl, setTtl] = useState(300);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ key, value, ttl });
    setKey('');
    setValue('');
    setTtl(300);
  };

  return (
    <Paper p="md" withBorder>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          mb="sm"
        />
        <NumberInput
          label="TTL (seconds)"
          value={ttl}
          onChange={(val) => setTtl(val)}
          min={1}
          mb="md"
        />
        <Group justify="flex-end">
          <Button type="submit">Add to Cache</Button>
        </Group>
      </form>
    </Paper>
  );
}