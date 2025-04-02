"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const handleLogin = async (e) => {
		e.preventDefault();
		setError(null);
		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
				credentials: "include", // include cookies in the request/response
			});
			if (res.ok) {
				// Login successful - JWT cookie is set by the server
				router.push("/"); // redirect to home or dashboard
			} else {
				const data = await res.json();
				setError(data.error || "Login failed");
			}
		} catch (err) {
			console.error("Login request error:", err);
			setError("Something went wrong. Please try again.");
		}
	};

	return (
		<div className="w-[calc(100vw-300px)] flex items-center justify-center bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded shadow">
				<h2 className="text-2xl font-bold text-center mb-6">Login</h2>
				<form onSubmit={handleLogin} className="space-y-6">
					<div>
						<label className="block text-gray-700">Email:</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
						/>
					</div>
					<div>
						<label className="block text-gray-700">Password:</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
						/>
					</div>
					{error && <p className="text-red-500 text-sm">{error}</p>}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-150"
					>
						Log In
					</button>
				</form>
			</div>
		</div>
	);
}
