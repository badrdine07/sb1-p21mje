FROM memcached:latest

# Copy custom configuration
COPY memcached.conf /etc/memcached.conf

# Expose default Memcached port
EXPOSE 11211

# Start Memcached with our config
CMD ["memcached", "-u", "memcache", "-f", "/etc/memcached.conf"]