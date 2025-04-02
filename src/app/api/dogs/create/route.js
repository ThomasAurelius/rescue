// app/api/dogs/create/route.js
import jwt from "jsonwebtoken";
import clientPromise from "../../../lib/mongodb";

export async function POST(request) {
	try {
		// Get the JWT token from cookies
		const token = request.cookies.get("token")?.value;
		if (!token) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		// Verify the token; if invalid, respond with Unauthorized
		let payload;
		try {
			payload = jwt.verify(token, process.env.JWT_SECRET);
		} catch (err) {
			return new Response(JSON.stringify({ error: "Invalid token" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		// Extract dog data from the request body
		const {
			name,
			age,
			breed,
			color,
			description,
			sex,
			weight,
			activityLevel,
			indoorOutdoor,
			goodWithKids,
			goodWithPets,
			healthStatus,
			trainingLevel,
			specialNeeds,
			adoptionFee,
			size,
			companions,
			location,
		} = await request.json();
		if (!name) {
			return new Response(
				JSON.stringify({ error: "Dog name is required" }),
				{ status: 400, headers: { "Content-Type": "application/json" } }
			);
		}

		// Connect to the database and access the "dogs" collection
		const client = await clientPromise;
		const db = client.db();
		const dogsCollection = db.collection("dogs");

		// Create the new dog document, associating it with the authenticated user
		const newDog = {
			name,
			age: age || null,
			breed: breed || null,
			location: location || null,
			color: color || null,
			description: description || null,
			sex: sex || null,
			weight: weight || null, // Ensure weight is provided; fallback to null if not
			activityLevel: activityLevel || null,
			indoorOutdoor: indoorOutdoor || null,
			goodWithKids: goodWithKids || null,
			goodWithPets: goodWithPets || null,
			healthStatus: healthStatus || null, // e.g., "Healthy", "Needs care"
			trainingLevel: trainingLevel || null, // e.g., "Basic", "Advanced"
			specialNeeds: specialNeeds || null, // e.g., "None", "Requires medication"
			adoptionFee: adoptionFee || null, // e.g., 100, 200
			size: size || null, // e.g., "Small", "Medium", "Large"
			companions: Array.isArray(companions)
				? companions
						.filter(
							(companion) =>
								typeof companion === "string" && companion.trim() !== ""
						)
						.map((companion) => companion.trim()) // Ensure companions is an array of non-empty strings
				: [], // Default to empty array if not provided or invalid

			createdBy: payload.userId,
			createdAt: new Date(),
		};

		// Insert the new dog document into MongoDB
		const result = await dogsCollection.insertOne(newDog);

		return new Response(
			JSON.stringify({
				message: "Dog created successfully",
				dogId: result.insertedId,
			}),
			{ status: 201, headers: { "Content-Type": "application/json" } }
		);
	} catch (error) {
		console.error("Error creating dog:", error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
