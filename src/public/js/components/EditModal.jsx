import React, { useState, useEffect } from 'react';
import { Modal, TextInput, NumberInput, Button, Group } from '@mantine/core';

export function EditModal({ item, isOpen, onClose, onSave }) {
  const [value, setValue] = useState('');
  const [ttl, setTtl] = useState(300);

  useEffect(() => {
    if (item) {
      setValue(item.value);
      setTtl(300); // Reset TTL on edit
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(item.key, { value, ttl });
    onClose();
  };

  return (
    <Modal 
      opened={isOpen} 
      onClose={onClose}
      title="Edit Cache Item"
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Key"
          value={item?.key || ''}
          disabled
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
          label="New TTL (seconds)"
          value={ttl}
          onChange={(val) => setTtl(val)}
          min={1}
          mb="md"
        />
        <Group justify="flex-end">
          <Button variant="subtle" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </Group>
      </form>
    </Modal>
  );
}