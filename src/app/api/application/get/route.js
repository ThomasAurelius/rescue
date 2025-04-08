import { NextResponse } from "next/server";
import { getRescueCollection } from "../../../lib/mongodb";

export async function POST(request) {
	try {
		const data = await request.json();

		// List of required fields from your schema
		const requiredFields = [
			"firstName",
			"lastName",
			"email",
			"phoneNumber",
			"streetAddress",
			"city",
			"state",
			"zipCode",
			"age",
			"indoorOutdoor",
			"humansInHouse",
			"dogsInHouse",
			"imageUrl",
			"images",
			"veternarianReference",
			"personalReference",
			"otherPets",
			"misc",
		];

		// Validate that all required fields are provided.
		for (const field of requiredFields) {
			if (!data[field] && data[field] !== 0) {
				return NextResponse.json(
					{ error: `${field} is required` },
					{ status: 400 }
				);
			}
		}

		// Build the new application document using your schema
		const newApplication = {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phoneNumber: data.phoneNumber,
			streetAddress: data.streetAddress,
			city: data.city,
			state: data.state,
			zipCode: data.zipCode,
			age: Number(data.age),
			indoorOutdoor: data.indoorOutdoor,
			humansInHouse: data.humansInHouse,
			dogsInHouse: data.dogsInHouse,
			imageUrl: data.imageUrl,
			images: Array.isArray(data.images) ? data.images : [],
			veternarianReference: data.veternarianReference,
			personalReference: data.personalReference,
			otherPets: data.otherPets,
			misc: data.misc,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		// Connect to MongoDB and insert the document into the "applications" collection
		const db = await getRescueCollection();
		const result = await db
			.collection("applications")
			.insertOne(newApplication);

		return NextResponse.json(
			{
				message: "Application created successfully",
				applicationId: result.insertedId,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating application:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
