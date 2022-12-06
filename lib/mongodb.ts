import { Db, MongoClient, MongoClientOptions } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB = process.env.MONGO_DB;

if (!MONGO_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
}

if (!MONGO_DB) {
    throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient = null! as MongoClient,
    cachedDb = null! as Db;

export default async function connect2db() {
    if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as MongoClientOptions;
    const client = new MongoClient(MONGO_URI!, options);
    await client.connect();
    cachedClient = client;
    cachedDb = client.db(MONGO_DB);
    return {
        client: cachedClient,
        db: cachedDb,
    };
}
