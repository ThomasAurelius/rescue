import { NextResponse } from "next/server";
import { getRescueCollection } from "../../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(request) {
	try {
		const body = await request.json();
		const { id, ...dogData } = body;

		if (!id) {
			return NextResponse.json(
				{ error: "Dog ID is required" },
				{ status: 400 }
			);
		}

		// Validate ID format
		if (!ObjectId.isValid(id)) {
			return NextResponse.json(
				{ error: "Invalid dog ID format" },
				{ status: 400 }
			);
		}

		// Process companions if it's a string
		if (typeof dogData.companions === "string") {
			dogData.companions = dogData.companions
				.split(",")
				.map((item) => item.trim())
				.filter(Boolean);
		}

		// Remove _id from dogData if it exists
		if (dogData._id) {
			delete dogData._id;
		}

		const rescueCollection = await getRescueCollection();

		// Update the dog
		const result = await rescueCollection.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: dogData }
		);

		if (result.matchedCount === 0) {
			return NextResponse.json({ error: "Dog not found" }, { status: 404 });
		}

		// Get the updated dog
		const updatedDog = await rescueCollection.findOne({
			_id: new ObjectId(id),
		});

		// Convert MongoDB _id to string
		const dogWithStringId = {
			...updatedDog,
			_id: updatedDog._id.toString(),
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
