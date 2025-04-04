// app/api/auth/logout/route.js
export async function POST(request) {
	// Clear the token cookie by setting an expired date
	return new Response(JSON.stringify({ message: "Logged out successfully" }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Set-Cookie": `token=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`,
		},
	});
}
