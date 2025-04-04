// app/api/dogs/get/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getRescueCollection } from "../../../lib/mongodb"; // or your helper to get the DB
import { ObjectId } from "mongodb";

export async function GET(request) {
	// Await cookies() before using its value
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	if (!token) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);

		// Connect to the database; adjust if you use a helper that returns the DB instance
		const db = await getRescueCollection();
		// Fetch all dogs, then pick one randomly
		const dogs = await db.collection("dogs").find({}).toArray();
		if (!dogs || dogs.length === 0) {
			return NextResponse.json({ error: "No dogs found" }, { status: 404 });
		}
		const randomDog = dogs[Math.floor(Math.random() * dogs.length)];

		return NextResponse.json({ dog: randomDog });
	} catch (err) {
		console.error("JWT verification error:", err);
		return NextResponse.json(
			{ error: "Invalid or expired token" },
			{ status: 401 }
		);
	}
}
