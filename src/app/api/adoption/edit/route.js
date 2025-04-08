import { NextResponse } from "next/server";
import { getRescueCollection } from "../../../lib/mongodb";

export async function PUT(request) {
	try {
		const data = await request.json();
		const { id, ...updates } = data;
		if (!id) {
			return NextResponse.json(
				{ error: "Adoption ID is required" },
				{ status: 400 }
			);
		}

		// Convert certain fields if provided
		if (updates.age) {
			updates.age = Number(updates.age);
		}
		if (updates.adoptionDate) {
			updates.adoptionDate = new Date(updates.adoptionDate);
		}
		// Always update the updatedAt timestamp
		updates.updatedAt = new Date();

		// Connect to the database and update the adoption record by _id
		const db = await getRescueCollection();
		const result = await db
			.collection("adoptions")
			.updateOne({ _id: id }, { $set: updates });

		if (result.modifiedCount === 0) {
			return NextResponse.json(
				{
					error: "No adoption was updated. Please check the ID or data provided.",
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: "Adoption updated successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating adoption:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
