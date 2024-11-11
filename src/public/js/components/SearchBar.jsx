import React from 'react';
import { TextInput, ActionIcon } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';

export function SearchBar({ value, onChange }) {
  return (
    <TextInput
      placeholder="Search by key..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      leftSection={<IconSearch size={16} />}
      rightSection={
        value && (
          <ActionIcon size="sm" variant="subtle" onClick={() => onChange('')}>
            <IconX size={16} />
          </ActionIcon>
        )
      }
    />
  );
}