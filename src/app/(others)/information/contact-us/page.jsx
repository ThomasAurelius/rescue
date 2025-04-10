"use client";
import React, { useState } from "react";

export default function ContactUsPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [status, setStatus] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		alert("Form not submitted!");
	};

	return (
		<div className="min-h-screen md:w-[calc(100vw-300px)]  p-8 flex items-start justify-center">
			<div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
				<p className="text-sm text-gray-500 mb-4">
					NOTE: This form is for example only. It can be customized to send
					you an email with the form's contents.
				</p>
				<h1 className="text-5xl font-bold mb-6 text-center">Contact Us</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="name"
							className="block text-lg font-medium text-gray-700"
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-lg font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						/>
					</div>
					<div>
						<label
							htmlFor="subject"
							className="block text-lg font-medium text-gray-700"
						>
							Subject
						</label>
						<input
							type="text"
							id="subject"
							name="subject"
							value={formData.subject}
							onChange={handleChange}
							required
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						/>
					</div>
					<div>
						<label
							htmlFor="message"
							className="block text-lg font-medium text-gray-700"
						>
							Message
						</label>
						<textarea
							id="message"
							name="message"
							value={formData.message}
							onChange={handleChange}
							required
							rows={5}
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						></textarea>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Send Message
					</button>
				</form>
				{status && <p className="mt-4 text-center text-lg">{status}</p>}
			</div>
		</div>
	);
}
