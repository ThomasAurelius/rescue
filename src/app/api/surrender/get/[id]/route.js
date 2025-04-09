// src/app/api/dogs/get/[id]/route.js
import { NextResponse } from "next/server";
import { getRescueCollection } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
	try {
		const { id } = params;

		// Validate ID format
		if (!ObjectId.isValid(id)) {
			return NextResponse.json(
				{ error: `Invalid ID format: ${id}` },
				{ status: 400 }
			);
		}

		// Get the rescues collection
		const db = await getRescueCollection();

		// Debug: log available methods on the collection
		console.log("Available methods:", Object.keys(db));

		// Find the dog using findOne instead of findById
		const dog = await db
			.collection("surrender")
			.findOne({ _id: new ObjectId(id) });

		if (!dog) {
			return NextResponse.json(
				{ error: "Surrender not found" },
				{ status: 404 }
			);
		}

		// Convert MongoDB _id to string before returning
		const dogWithStringId = { ...dog, _id: dog._id.toString() };

		return NextResponse.json(dogWithStringId);
	} catch (error) {
		console.error("Server error:", error);
		return NextResponse.json(
			{ error: `Internal server error: ${error.message}` },
			{ status: 500 }
		);
	}
}
