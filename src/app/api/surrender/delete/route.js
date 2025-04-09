// app/api/surrender/delete/route.js
import { NextResponse } from "next/server";
import { getRescueCollection } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(request) {
	try {
		// Parse the request body for the ID to delete
		const { id } = await request.json();

		if (!id) {
			return NextResponse.json(
				{ error: "Missing id in request body" },
				{ status: 400 }
			);
		}

		if (!ObjectId.isValid(id)) {
			return NextResponse.json(
				{ error: `Invalid ID format: ${id}` },
				{ status: 400 }
			);
		}

		// Get the rescue collection (which should point to the "surrender" collection in your rescue database)
		const db = await getRescueCollection();

		// Attempt to delete the document with the provided _id
		const result = await db
			.collection("surrender")
			.deleteOne({ _id: new ObjectId(id) });

		if (result.deletedCount === 1) {
			return NextResponse.json(
				{ message: "Application deleted successfully" },
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{ error: "Application not found" },
				{ status: 404 }
			);
		}
	} catch (error) {
		console.error("Error deleting application:", error);
		return NextResponse.json(
			{ error: `Internal server error: ${error.message}` },
			{ status: 500 }
		);
	}
}
