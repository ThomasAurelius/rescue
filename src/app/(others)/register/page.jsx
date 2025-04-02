"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // App Router's navigation hook

export default function RegisterPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const handleRegister = async (e) => {
		e.preventDefault();
		setError(null);
		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			if (res.ok) {
				// Registration successful - redirect to login page (or auto-login).
				router.push("/login");
			} else {
				const data = await res.json();
				setError(data.error || "Registration failed");
			}
		} catch (err) {
			console.error("Registration request error:", err);
			setError("Something went wrong. Please try again.");
		}
	};

	return (
		<div className=" w-[calc(100vw-300px)] flex items-center justify-center bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded shadow">
				<h2 className="text-2xl font-bold text-center mb-6">Register</h2>
				<form onSubmit={handleRegister} className="space-y-6">
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
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
}
