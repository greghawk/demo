const MongoClient = require('mongodb').MongoClient;
const memCache = require('./memCache');
const memKey = 'children';
const dbName = 'passport';
const collName = 'tree';
const url = process.env.MONGO_PROD_CONN;
let dbInstance;

MongoClient.connect(url, function (err, client) {
    console.log("Connected successfully to server");
    dbInstance = client.db(dbName);
    init();
});

const create = async (data) => {
    memCache.invalidate(memKey);
    const collection = dbInstance.collection(collName);
    const result = await collection.update({}, data, {upsert: true}).catch(error => console.log(error.message));
    if (result) {
        memCache.put(memKey, data);
        return {data: data};
    }
};

const read = async () => {
    const cache = memCache.get(memKey);
    if (cache)
        return cache;
    const collection = dbInstance.collection(collName);
    const data = await collection.findOne({}).catch(error => console.log(error.message));
    if (data)
        return data;
};

const update = async (data) => {
    memCache.invalidate(memKey);

    const collection = dbInstance.collection(collName);
    const result = await collection.update({}, data, {upsert: true}).catch(error => console.log(error.message));
    if (result) {
        memCache.put(memKey, data);
        return {data: data};
    }
};

const del3te = async () => {
    memCache.invalidate(memKey);

    const collection = dbInstance.collection(collName);
    const result = await collection.deleteOne({}).catch(error => console.log(error.message));
    if (result)
        return result;
};

const init = () => {
    read().then(res => {
        memCache.put(memKey, res)
    }, err => {
        console.log('error on init')
    })
};

module.exports = {
    create: async (data) => await create(data),
    read: async () => await read(),
    update: async (data) => await update(data),
    delete: async (data) => await del3te()
};