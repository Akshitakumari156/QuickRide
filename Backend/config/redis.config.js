const Redis = require('ioredis');

// Custom in-memory mock client representing basic Redis commands
class MemoryRedis {
  constructor() {
    this.store = new Map();
    this.geoStore = new Map(); // key -> Map(member -> {lng, lat})
  }

  async get(key) {
    const val = this.store.get(key);
    return typeof val === 'string' ? val : null;
  }

  async set(key, value, ...args) {
    this.store.set(key, String(value));
    return "OK";
  }

  async hset(key, ...args) {
    let obj = this.store.get(key);
    if (!obj || typeof obj !== 'object') {
      obj = {};
      this.store.set(key, obj);
    }
    if (args.length === 2) {
      obj[args[0]] = args[1];
    } else {
      for (let i = 0; i < args.length; i += 2) {
        if (args[i] !== undefined && args[i+1] !== undefined) {
          obj[args[i]] = args[i+1];
        }
      }
    }
    return "OK";
  }

  async del(key) {
    this.store.delete(key);
    this.geoStore.delete(key);
    return 1;
  }

  async geoadd(key, lng, lat, member) {
    if (!this.geoStore.has(key)) {
      this.geoStore.set(key, new Map());
    }
    this.geoStore.get(key).set(String(member), { lng: Number(lng), lat: Number(lat) });
    return 1;
  }

  async zrem(key, member) {
    if (this.geoStore.has(key)) {
      this.geoStore.get(key).delete(String(member));
    }
    return 1;
  }

  async georadius(key, longitude, latitude, radius, unit, option) {
    const members = this.geoStore.get(key);
    if (!members) return [];
    
    const results = [];
    const R = 6371; // Earth radius in km

    const toRad = (val) => (val * Math.PI) / 180;

    for (const [member, coords] of members.entries()) {
      const dLat = toRad(coords.lat - latitude);
      const dLon = toRad(coords.lng - longitude);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(latitude)) *
          Math.cos(toRad(coords.lat)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let distance = R * c; // in km

      if (unit === "m") {
        distance *= 1000;
      }

      if (distance <= radius) {
        if (option === "WITHDIST") {
          results.push([member, String(distance)]);
        } else {
          results.push(member);
        }
      }
    }
    
    // Sort by distance ascending
    if (option === "WITHDIST") {
      results.sort((a, b) => Number(a[1]) - Number(b[1]));
    }
    return results;
  }
}

let useMemory = false;
const memoryRedis = new MemoryRedis();

// Initialize ioredis with a fail-fast retry strategy
const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  maxRetriesPerRequest: null,
  enableOfflineQueue: false,
  retryStrategy(times) {
    if (times > 2) {
      if (!useMemory) {
        console.warn("⚠️ Redis connection failed. Falling back to local in-memory mock client.");
        useMemory = true;
      }
      return null; // Stop reconnect retries
    }
    return 1000; // Retry after 1s
  }
});

redis.on("connect", () => {
  console.log("Redis connected successfully");
  useMemory = false;
});

redis.on("error", (err) => {
  if (!useMemory) {
    console.warn("⚠️ Redis error detected. Switching to local in-memory mock client.");
    useMemory = true;
  }
});

// A proxy wrapper to route calls to either ioredis or MemoryRedis transparently
const handler = {
  get(target, prop) {
    if (useMemory) {
      if (typeof memoryRedis[prop] === 'function') {
        return memoryRedis[prop].bind(memoryRedis);
      }
      return memoryRedis.store.get(prop);
    }
    
    const value = target[prop];
    if (typeof value === 'function') {
      return function (...args) {
        if (useMemory) {
          if (typeof memoryRedis[prop] === 'function') {
            return memoryRedis[prop](...args);
          }
          return undefined;
        }
        try {
          const result = value.apply(target, args);
          if (result && typeof result.catch === 'function') {
            return result.catch((err) => {
              if (err.code === 'ECONNREFUSED' || err.message.includes('closed') || err.message.includes('connection')) {
                if (!useMemory) {
                  console.warn("⚠️ Redis command failed due to connection issue. Falling back to local in-memory mock client.");
                  useMemory = true;
                }
                if (typeof memoryRedis[prop] === 'function') {
                  return memoryRedis[prop](...args);
                }
              }
              throw err;
            });
          }
          return result;
        } catch (err) {
          if (err.code === 'ECONNREFUSED' || err.message.includes('closed') || err.message.includes('connection')) {
            if (!useMemory) {
              console.warn("⚠️ Redis command failed due to connection issue. Falling back to local in-memory mock client.");
              useMemory = true;
            }
            if (typeof memoryRedis[prop] === 'function') {
              return memoryRedis[prop](...args);
            }
          }
          throw err;
        }
      };
    }
    return value;
  }
};

const proxy = new Proxy(redis, handler);

module.exports = proxy;