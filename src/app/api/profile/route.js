// app/api/profile/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getRescueCollection } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request) {
	// Await cookies() before using its value
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	if (!token) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		// getRescueCollection returns the DB instance directly.
		const db = await getRescueCollection();

		// Now db.collection('users') works
		const user = await db
			.collection("users")
			.findOne({ _id: new ObjectId(payload.userId) });

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		return NextResponse.json({ user });
	} catch (err) {
		console.error("JWT verification error:", err);
		return NextResponse.json(
			{ error: "Invalid or expired token" },
			{ status: 401 }
		);
	}
}
