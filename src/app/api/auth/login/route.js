// app/api/auth/login/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import clientPromise from "@/app/lib/mongodb";

export async function POST(request) {
	try {
		const { email, password } = await request.json();

		// Connect to DB and get user by email
		const client = await clientPromise;
		const db = client.db();
		const usersCollection = db.collection("users");
		const user = await usersCollection.findOne({ email });
		if (!user) {
			return NextResponse.json(
				{ error: "Invalid email or password" },
				{ status: 401 }
			);
		}

		// Compare provided password with the hashed password in DB
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return NextResponse.json(
				{ error: "Invalid email or password" },
				{ status: 401 }
			);
		}

		// Credentials are valid – create a JWT token
		const token = jwt.sign(
			{ userId: user._id.toString(), email: user.email }, // payload
			process.env.JWT_SECRET, // secret key
			{ expiresIn: "1d" } // token expiration (e.g., 1 day)
		);

		// Set the JWT in an HTTP-only cookie
		const response = NextResponse.json({ message: "Login successful" });
		response.cookies.set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // true in prod, false in dev
			sameSite: "strict",
			maxAge: 60 * 60 * 24, // 1 day in seconds
			path: "/", // root path – cookie valid for entire site
		});
		return response;
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
