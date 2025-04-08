"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { setToken } from "../../../../src/app/utils/auth";

export default function Login() {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const [captchaToken, setCaptchaToken] = useState(null);
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleCaptchaChange = (token) => {
		setCaptchaToken(token);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!captchaToken) {
			setError("Please complete the captcha.");
			return;
		}

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...credentials, captchaToken }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Login failed");
			}

			// Store the token and redirect
			setToken(data.token);
			window.location.href = "/";
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
				<div>
					<h2 className="text-center text-3xl font-extrabold text-gray-900">
						Sign in to your account
					</h2>
				</div>
				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
						{error}
					</div>
				)}
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email" className="sr-only">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								value={credentials.email}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								value={credentials.password}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="flex justify-center">
						<ReCAPTCHA
							sitekey="6Lcc7Q4rAAAAAIzQ2tHG78vQ7oalzkij0FVMyAUQ"
							onChange={handleCaptchaChange}
						/>
					</div>
					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
