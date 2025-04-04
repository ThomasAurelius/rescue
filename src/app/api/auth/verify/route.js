// app/api/auth/verify/route.js
import jwt from "jsonwebtoken";

export async function GET(request) {
	const token = request.cookies.get("token")?.value;
	console.log("Verify endpoint token:", token); // Log token for debugging
	if (!token) {
		console.log("No token found");
		return new Response(JSON.stringify({ isLoggedIn: false }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		console.log("Token verified:", payload);
		return new Response(
			JSON.stringify({
				isLoggedIn: true,
				user: { userId: payload.userId, email: payload.email },
			}),
			{ status: 200, headers: { "Content-Type": "application/json" } }
		);
	} catch (error) {
		console.error("JWT verification error:", error);
		return new Response(JSON.stringify({ isLoggedIn: false }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}
}
