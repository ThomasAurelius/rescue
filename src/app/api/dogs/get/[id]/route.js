// src/app/api/dogs/get/[id]/route.js
import { NextResponse } from "next/server";
import { getRescueCollection } from "../../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
	try {
		const { id } = params;

		// Validate ID format
		if (!ObjectId.isValid(id)) {
			return NextResponse.json(
				{ error: `Invalid dog ID format: ${id}` },
				{ status: 400 }
			);
		}

		// Get the rescues collection
		const rescueCollection = await getRescueCollection();

		// Find the dog
		const dog = await rescueCollection.findOne({ _id: new ObjectId(id) });

		if (!dog) {
			return NextResponse.json({ error: "Dog not found" }, { status: 404 });
		}

		// Convert MongoDB _id to string
		const dogWithStringId = {
			...dog,
			_id: dog._id.toString(),
		};

		return NextResponse.json(dogWithStringId);
	} catch (error) {
		console.error("Server error:", error);
		return NextResponse.json(
			{ error: `Internal server error: ${error.message}` },
			{ status: 500 }
		);
	}
}
