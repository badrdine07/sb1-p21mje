import { useState, useEffect } from 'react';

export function useOperations() {
  const [operations, setOperations] = useState([]);

  const addOperation = (operation) => {
    setOperations(prev => [
      {
        ...operation,
        timestamp: Date.now()
      },
      ...prev
    ].slice(0, 100)); // Keep last 100 operations
  };

  // Subscribe to Server-Sent Events
  useEffect(() => {
    const eventSource = new EventSource('/events');

    eventSource.onmessage = (event) => {
      const operation = JSON.parse(event.data);
      addOperation(operation);
    };

    return () => eventSource.close();
  }, []);

  return { operations, addOperation };
}