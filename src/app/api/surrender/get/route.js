// app/api/dogs/get/route.js
import { NextResponse } from "next/server";
import { getRescueCollection } from "../../../lib/mongodb";

export async function GET(request) {
	try {
		// Connect to the database
		const db = await getRescueCollection();
		// Fetch all dogs, then pick one randomly
		const dogs = await db.collection("surrender").find({}).toArray();
		if (!dogs || dogs.length === 0) {
			return NextResponse.json(
				{ error: "No surrenders found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ dogs });
	} catch (err) {
		console.error("Error fetching dogs:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
