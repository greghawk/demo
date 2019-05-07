let store = {};

const get = (key) => store[key] ? store[key] : undefined;
const put = (key, data) => store[key] = data;
const invalidate = (key) => { if(store[key]) delete store[key]};

module.exports = {
    get: (key) => get(key),
    put: (key, data) => put(key, data),
    invalidate: (key) => invalidate(key)
};