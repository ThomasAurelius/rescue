// app/lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
	throw new Error("Please add your MongoDB URI to .env.local");
}

// In development, use a global variable to preserve the client across hot reloads
if (process.env.NODE_ENV === "development") {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

// Return the DB instance directly (replace "my-db-name" with your database name)
export async function getRescueCollection() {
	const client = await clientPromise;
	return client.db("rescue");
}
