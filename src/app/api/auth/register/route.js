// app/api/auth/register/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import clientPromise from "../../../lib/mongodb"; // adjust the import based on your project structure

export async function POST(request) {
	try {
		const { email, password } = await request.json();

		// Connect to the database and get the users collection
		const client = await clientPromise;
		const db = client.db();
		const usersCollection = db.collection("users");

		// Check if the user already exists
		const existingUser = await usersCollection.findOne({ email });
		if (existingUser) {
			return NextResponse.json(
				{ error: "User already exists. Please login instead." },
				{ status: 400 }
			);
		}

		// Hash the password with bcrypt before storing
		const hashedPassword = await bcrypt.hash(password, 10); // saltRounds = 10
		await usersCollection.insertOne({ email, password: hashedPassword });

		return NextResponse.json(
			{ message: "User registered successfully" },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Registration error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
