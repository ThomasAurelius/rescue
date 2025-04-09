// app/api/dogs/create/route.js
import jwt from "jsonwebtoken";
import { getRescueCollection } from "../../../lib/mongodb";

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
			ownerName,
			ownerEmail,
			ownerPhone,
			ownerCity,
			name,
			age,
			breed,
			color,
			sex,
			weight,

			health,
			ivddStatus,
			reason,
			specialNeeds,

			images,
		} = await request.json();
		if (!name) {
			return new Response(
				JSON.stringify({ error: "Dog name is required" }),
				{ status: 400, headers: { "Content-Type": "application/json" } }
			);
		}

		// Connect to the database and access the "dogs" collection
		// getRescueCollection returns the DB instance directly.
		const db = await getRescueCollection();
		const dogsCollection = db.collection("surrender");

		// Create the new dog document, associating it with the authenticated user
		const newDog = {
			ownerName: ownerName || null,
			ownerEmail: ownerEmail || null,
			ownerPhone: ownerPhone || null,
			ownerCity: ownerCity || null,
			reason: reason || null,
			ivddStatus: ivddStatus || null,
			health: health || null,
			specialNeeds: specialNeeds || null,
			images: Array.isArray(images)
				? images
						.filter(
							(image) => typeof image === "string" && image.trim() !== ""
						)
						.map((image) => image.trim())
				: [],

			name,
			age: age || null,
			breed: breed || null,

			color: color || null,

			sex: sex || null,
			weight: weight || null,
			createdBy: payload.userId,
			createdAt: new Date(),
		};

		// Insert the new dog document into MongoDB
		const result = await dogsCollection.insertOne(newDog);

		return new Response(
			JSON.stringify({
				message: "Surrender created successfully",
				dogId: result.insertedId,
			}),
			{ status: 201, headers: { "Content-Type": "application/json" } }
		);
	} catch (error) {
		console.error("Error creating surrender:", error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
