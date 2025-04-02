import { getRescueCollection } from "../../../lib/mongodb";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		res.setHeader("Allow", "GET");
		return res.status(405).json({ error: "Method not allowed" });
	}

	// Retrieve token from the Authorization header (expected format: "Bearer <token>")
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({ error: "No token provided" });
	}

	const token = authHeader.split(" ")[1];
	if (!token) {
		return res.status(401).json({ error: "No token provided" });
	}

	try {
		// Verify token (replace process.env.JWT_SECRET with your actual secret)
		jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		return res.status(401).json({ error: "Invalid token" });
	}

	try {
		const rescueCollection = await getRescueCollection();
		const records = await rescueCollection.find({}).toArray();
		return res.status(200).json(records);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}
