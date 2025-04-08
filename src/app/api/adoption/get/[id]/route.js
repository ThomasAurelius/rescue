// app/api/adoption/get/[id]/route.js
import { NextResponse } from "next/server";
import { getRescueCollection } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
	try {
		const { id } = params;

		// Validate ID format
		if (!ObjectId.isValid(id)) {
			return NextResponse.json(
				{ error: `Invalid adoption ID format: ${id}` },
				{ status: 400 }
			);
		}

		// Get the database instance (assumed to be the rescue collection)
		const db = await getRescueCollection();

		// Fetch the adoption from the "adoptions" collection
		const adoption = await db.collection("adoptions").findOne({
			_id: new ObjectId(id),
		});

		if (!adoption) {
			return NextResponse.json(
				{ error: "Adoption not found" },
				{ status: 404 }
			);
		}

		// Convert MongoDB _id to string
		const adoptionWithStringId = {
			...adoption,
			_id: adoption._id.toString(),
		};

		return NextResponse.json(adoptionWithStringId);
	} catch (error) {
		console.error("Server error:", error);
		return NextResponse.json(
			{ error: `Internal server error: ${error.message}` },
			{ status: 500 }
		);
	}
}
