// 模拟Chrome API
window.chrome = {
  runtime: {
    getURL: (path) => `assets/${path}`,
    sendMessage: (message, callback) => {
      console.log('Mock chrome.runtime.sendMessage:', message);
      if (callback) callback({});
    },
    onMessage: {
      addListener: (callback) => {
        console.log('Mock chrome.runtime.onMessage.addListener registered');
      },
    },
  },
  storage: {
    local: {
      get: (keys, callback) => {
        const data = {};
        if (Array.isArray(keys)) {
          keys.forEach(key => {
            data[key] = localStorage.getItem(key);
          });
        } else if (typeof keys === 'string') {
          data[keys] = localStorage.getItem(keys);
        } else if (keys === null) {
          Object.keys(localStorage).forEach(key => {
            data[key] = localStorage.getItem(key);
          });
        }
        if (callback) callback(data);
      },
      set: (items, callback) => {
        Object.entries(items).forEach(([key, value]) => {
          localStorage.setItem(key, JSON.stringify(value));
        });
        if (callback) callback();
      },
      remove: (keys, callback) => {
        if (Array.isArray(keys)) {
          keys.forEach(key => localStorage.removeItem(key));
        } else {
          localStorage.removeItem(keys);
        }
        if (callback) callback();
      },
    },
  },
  tabs: {
    create: (properties, callback) => {
      console.log('Mock chrome.tabs.create:', properties);
      if (callback) callback({ id: 1 });
    },
    query: (queryInfo, callback) => {
      console.log('Mock chrome.tabs.query:', queryInfo);
      if (callback) callback([{ id: 1, url: window.location.href }]);
    },
  },
}; 