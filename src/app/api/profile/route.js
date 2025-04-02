// app/api/profile/route.js (protected example)
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request) {
	const tokenCookie = cookies(); // cookies from next/headers
	const token = (await tokenCookie).get("token")?.value;
	if (!token) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	try {
		// Verify the token using the same secret
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		// Token is valid; payload contains userId and email (as we set in login)
		// Here you could fetch and return the user's profile from the database:
		// const user = await db.collection('users').findOne({ _id: new ObjectId(payload.userId) });
		return NextResponse.json({ message: `Hello, user ${payload.email}!` });
	} catch (err) {
		return NextResponse.json(
			{ error: "Invalid or expired token" },
			{ status: 401 }
		);
	}
}
