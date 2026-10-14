/** localStorage wrapper with an in-memory fallback (private mode, blocked storage). */

export const SAFE_STORAGE = (() => {
  const memoryStore = new Map();
  return {
    get(key, fallback = null) {
      try {
        const raw = window.localStorage.getItem(key);
        return raw !== null ? JSON.parse(raw) : fallback;
      } catch (err) {
        return memoryStore.has(key) ? memoryStore.get(key) : fallback;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        memoryStore.set(key, value);
      }
    }
  };
})();
