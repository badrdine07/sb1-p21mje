import React from 'react';
import { NavLink } from 'react-router-dom';
import { Stack, Text } from '@mantine/core';
import { IconDatabase, IconFileText, IconActivity } from '@tabler/icons-react';

export function Navigation() {
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    padding: '12px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '&:hover': {
      backgroundColor: '#f0f0f0'
    },
    '&.active': {
      backgroundColor: '#e0e0e0'
    }
  };

  return (
    <Stack gap="sm">
      <NavLink to="/" style={linkStyle} end>
        <IconDatabase size={20} />
        <Text>Cache Management</Text>
      </NavLink>
      <NavLink to="/monitor" style={linkStyle}>
        <IconActivity size={20} />
        <Text>I/O Monitor</Text>
      </NavLink>
      <NavLink to="/docs" style={linkStyle}>
        <IconFileText size={20} />
        <Text>Documentation</Text>
      </NavLink>
    </Stack>
  );
}