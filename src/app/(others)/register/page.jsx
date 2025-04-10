"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // App Router's navigation hook
import ReCAPTCHA from "react-google-recaptcha";

export default function RegisterPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [captchaToken, setCaptchaToken] = useState(null);
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	const handleCaptchaChange = (token) => {
		setCaptchaToken(token);
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		setError(null);

		// Ensure the captcha is completed before proceeding
		if (!captchaToken) {
			setError("Please complete the captcha.");
			return;
		}

		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				// Send captchaToken along with the email and password
				body: JSON.stringify({ email, password, captchaToken }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Registration failed");
			}

			// Registration successful - redirect to login page (or auto-login).
			router.push("/login");
		} catch (err) {
			console.error("Registration request error:", err);
			setError(err.message);
		}
	};

	return (
		<div className="w-[calc(100vw-300px)] w-full h-screen flex pt-12 items-start justify-center ">
			<div className=" sm:w-full w-[280px] p-8 bg-gray-100 rounded shadow">
				<h2 className="text-2xl font-bold text-center mb-6">Register</h2>
				<form onSubmit={handleRegister} className="bg-gray-100space-y-6">
					<div>
						<label className="block text-gray-700">Email:</label>
						<input
							type="email"
							name="email"
							value={email}
							onChange={handleChange}
							required
							className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
						/>
					</div>
					<div>
						<label className="block pt-8 text-gray-700">Password:</label>
						<input
							type="password"
							name="password"
							value={password}
							onChange={handleChange}
							required
							className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
						/>
					</div>
					{/* reCAPTCHA */}
					<div className="flex w-[280px] justify-center items-center pt-8">
						<ReCAPTCHA
							sitekey="6Lcc7Q4rAAAAAIzQ2tHG78vQ7oalzkij0FVMyAUQ"
							onChange={handleCaptchaChange}
							className="g-recaptcha mx-auto flex justify-center"
							style={{
								transform: "scale(0.77)",
								transformOrigin: "0 0",
							}}
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
