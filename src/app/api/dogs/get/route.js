// app/api/dogs/get/route.js
import { NextResponse } from "next/server";
import { getRescueCollection } from "../../../lib/mongodb"; // your helper that returns the DB instance

export async function GET(request) {
	try {
		// Connect to the database
		const db = await getRescueCollection();
		// Fetch all dogs, then pick one randomly
		const dogs = await db.collection("dogs").find({}).toArray();
		if (!dogs || dogs.length === 0) {
			return NextResponse.json({ error: "No dogs found" }, { status: 404 });
		}
		const randomDog = dogs[Math.floor(Math.random() * dogs.length)];
		return NextResponse.json({ dog: randomDog });
	} catch (err) {
		console.error("Error fetching dogs:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
