import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

if (!uri) {
	throw new Error(
		"Please define the MONGODB_URI environment variable in .env.local"
	);
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
	// In development, use a global variable to preserve connection across module reloads
	client = new MongoClient(uri);
	global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise; // Reuse existing promise if available

export async function getRescueCollection() {
	const client = await clientPromise;
	const db = client.db(dbName);
	return db.collection("rescue");
}

export default clientPromise;
