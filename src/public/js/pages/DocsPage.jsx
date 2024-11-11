import React from 'react';
import { Container, Title, Text, Code, Space, List } from '@mantine/core';

export function DocsPage() {
  return (
    <Container size="lg">
      <Title>Cache Service Documentation</Title>
      <Space h="xl" />
      
      <Title order={2}>API Endpoints</Title>
      <Space h="md" />
      
      <Title order={3}>Set Cache Value</Title>
      <Text>POST /cache/:key</Text>
      <Code block>
{`curl -X POST -H "Content-Type: application/json" \\
  -d '{"value":"test","ttl":300}' \\
  http://localhost:3000/cache/mykey`}
      </Code>
      <Space h="md" />
      
      <Title order={3}>Get Cache Value</Title>
      <Text>GET /cache/:key</Text>
      <Code block>
        curl http://localhost:3000/cache/mykey
      </Code>
      <Space h="md" />
      
      <Title order={3}>Delete Cache Value</Title>
      <Text>DELETE /cache/:key</Text>
      <Code block>
        curl -X DELETE http://localhost:3000/cache/mykey
      </Code>
      <Space h="md" />
      
      <Title order={3}>Clear All Cache</Title>
      <Text>DELETE /cache</Text>
      <Code block>
        curl -X DELETE http://localhost:3000/cache
      </Code>
      <Space h="md" />
      
      <Title order={3}>Get Cache Stats</Title>
      <Text>GET /stats</Text>
      <Code block>
        curl http://localhost:3000/stats
      </Code>
      <Space h="xl" />
      
      <Title order={2}>Cache Configuration</Title>
      <List>
        <List.Item>Default TTL: 300 seconds (5 minutes)</List.Item>
        <List.Item>In-memory storage using node-cache</List.Item>
        <List.Item>Automatic key expiration</List.Item>
      </List>
    </Container>
  );
}