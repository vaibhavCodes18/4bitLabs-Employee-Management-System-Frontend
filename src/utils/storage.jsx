// Keys for localStorage
const STORAGE_KEYS = {
  TRAINERS: '4bitlabs_trainers',
  ANALYSTS: '4bitlabs_analysts',
  COUNSELLORS: '4bitlabs_counsellors',
};

// Load data from localStorage or fallback to initial JSON
export const loadFromStorage = (key, initialData) => {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored data', e);
    }
  }
  return initialData;
};

// Save data to localStorage
export const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};