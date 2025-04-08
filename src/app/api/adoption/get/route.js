// app/api/adoption/get/route.js
import { NextResponse } from "next/server";
import { getRescueCollection } from "../../../lib/mongodb"; // your helper that returns the DB instance

export async function GET(request) {
	try {
		// Connect to the database
		const db = await getRescueCollection();
		// Fetch all adoptions
		const adoptions = await db.collection("adoptions").find({}).toArray();
		if (!adoptions || adoptions.length === 0) {
			return NextResponse.json(
				{ error: "No adoptions found" },
				{ status: 404 }
			);
		}
		return NextResponse.json({ adoptions });
	} catch (err) {
		console.error("Error fetching adoptions:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
