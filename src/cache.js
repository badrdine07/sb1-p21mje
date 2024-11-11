import NodeCache from 'node-cache';

// Initialize cache with 5 minutes TTL by default
const cache = new NodeCache({ stdTTL: 300 });

export const cacheService = {
  set(key, value, ttl = 300) {
    return cache.set(key, value, ttl);
  },

  get(key) {
    return cache.get(key);
  },

  delete(key) {
    return cache.del(key);
  },

  flush() {
    return cache.flushAll();
  },

  stats() {
    return cache.getStats();
  }
};

// Export cache instance for direct access in server.js
export { cache };