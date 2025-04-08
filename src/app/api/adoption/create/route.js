// app/api/adoptions/create/route.js
import { NextResponse } from "next/server";
import { getRescueCollection } from "../../../lib/mongodb";

export async function POST(request) {
	try {
		const data = await request.json();

		// Validate required fields
		const requiredFields = [
			"dogName",
			"breed",
			"age",
			"description",
			"familyName",
			"sex",
			"adoptionDate",
			"imageUrl",
			"images",
		];

		for (const field of requiredFields) {
			if (!data[field]) {
				return NextResponse.json(
					{ error: `${field} is required` },
					{ status: 400 }
				);
			}
		}

		// Build the adoption record
		const newAdoption = {
			// generate unique ID
			dogName: data.dogName,
			breed: data.breed,
			age: Number(data.age),
			description: data.description,
			familyName: data.familyName,
			sex: data.sex,
			adoptionDate: new Date(data.adoptionDate),
			imageUrl: data.imageUrl,
			images: data.images, // Expecting an array of image URLs
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		// Connect to the database
		const db = await getRescueCollection();
		const result = await db.collection("adoptions").insertOne(newAdoption);

		return NextResponse.json(
			{
				message: "Adoption created successfully",
				adoptionId: newAdoption._id,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating adoption:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
