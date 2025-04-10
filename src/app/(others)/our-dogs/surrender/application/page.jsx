"use client";
import React, { useState } from "react";
import { uploadImage } from "../../../../utils/uploadImage";

export default function SurrenderApplicationPage() {
	// State for text/number fields, including owner information and dog info
	const [formData, setFormData] = useState({
		ownerName: "",
		ownerPhone: "",
		ownerEmail: "",
		ownerCity: "",
		name: "",
		age: "",
		sex: "Male",
		breed: "",
		color: "",
		reason: "",
		ivddStatus: "",
		health: "",
		specialNeeds: "",
	});

	// State for image uploads
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

	// State for feedback messages
	const [message, setMessage] = useState("");

	// Handle input changes for form fields
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Update file input state
	const handleFileChange = (e) => {
		setSelectedFiles(Array.from(e.target.files));
	};

	// Upload selected images to Firebase Storage using the uploadImage utility
	const handleUploadImages = async () => {
		if (!selectedFiles.length) return [];
		try {
			const urls = await Promise.all(
				selectedFiles.map((file) => uploadImage(file))
			);
			setUploadedImageUrls(urls);
			return urls;
		} catch (error) {
			console.error("Error uploading images:", error);
			setMessage("Error uploading images.");
			return [];
		}
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");

		// Upload images if files are selected
		let imageUrls = uploadedImageUrls;
		if (selectedFiles.length && uploadedImageUrls.length === 0) {
			imageUrls = await handleUploadImages();
		}

		// Construct payload for API
		const payload = {
			...formData,
			age: Number(formData.age),
			images: imageUrls,
		};

		try {
			const res = await fetch("/api/surrender/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (res.ok) {
				setMessage("Surrender application submitted successfully!");
				// Clear form fields and images after successful submission
				setFormData({
					ownerName: "",
					ownerPhone: "",
					ownerEmail: "",
					ownerCity: "",
					name: "",
					age: "",
					sex: "Male",
					breed: "",
					weight: "",
					color: "",
					reason: "",
					ivddStatus: "",
					health: "",
					specialNeeds: "",
				});
				setSelectedFiles([]);
				setUploadedImageUrls([]);
			} else {
				const errorData = await res.json();
				setMessage(`Error: ${errorData.error}`);
			}
		} catch (error) {
			console.error("Error submitting application:", error);
			setMessage("Error submitting application.");
		}
	};

	return (
		<div className="md:w-[calc(100vw-300px)] flex flex-col justify-center items-center max-w-3xl mx-auto p-8 shadow-lg bg-white rounded-lg">
			<h1 className="text-4xl font-bold text-center mb-8">
				Surrender Your Dog
			</h1>
			{message && <p className="text-center mb-4 text-lg">{message}</p>}
			<form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
				{/* Owner Information */}
				<h2 className="text-2xl font-bold mb-4">Owner Information</h2>
				<div>
					<label htmlFor="ownerName" className="block font-medium mb-2">
						Owner Name
					</label>
					<input
						type="text"
						id="ownerName"
						name="ownerName"
						className="w-full p-2 border border-gray-300 rounded"
						value={formData.ownerName}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="ownerPhone" className="block font-medium mb-2">
						Phone Number
					</label>
					<input
						type="tel"
						id="ownerPhone"
						name="ownerPhone"
						className="w-full p-2 border border-gray-300 rounded"
						value={formData.ownerPhone}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="ownerEmail" className="block font-medium mb-2">
						Email
					</label>
					<input
						type="email"
						id="ownerEmail"
						name="ownerEmail"
						className="w-full p-2 border border-gray-300 rounded"
						value={formData.ownerEmail}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="ownerCity" className="block font-medium mb-2">
						City
					</label>
					<input
						type="text"
						id="ownerCity"
						name="ownerCity"
						className="w-full p-2 border border-gray-300 rounded"
						value={formData.ownerCity}
						onChange={handleChange}
						required
					/>
				</div>

				{/* Dog's Information */}
				<h2 className="text-2xl font-bold mb-4">Dog Information</h2>
				{/* Dog's Name */}
				<div>
					<label htmlFor="name" className="block font-medium mb-2">
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						className="w-full p-2 border border-gray-300 rounded"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Age */}
				<div>
					<label htmlFor="age" className="block font-medium mb-2">
						Age
					</label>
					<input
						type="number"
						id="age"
						name="age"
						className="w-full p-2 border border-gray-300 rounded"
						value={formData.age}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Sex */}
				<div>
					<label htmlFor="sex" className="block font-medium mb-2">
						Sex
					</label>
					<select
						id="sex"
						name="sex"
						className="w-full p-2 border border-gray-300 rounded"
						value={formData.sex}
						onChange={handleChange}
						required
					>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
				</div>
				{/* Breed */}
				<div>
					<label htmlFor="breed" className="block font-medium mb-2">
						Breed
					</label>
					<input
						type="text"
						id="breed"
						name="breed"
						className="w-full p-2 border border-gray-300 rounded"
						value={formData.breed}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Weight */}
				<div>
					<label htmlFor="breed" className="block font-medium mb-2">
						Weight
					</label>
					<input
						type="text"
						id="weight"
						name="weight"
						className="w-full p-2 border border-gray-300 rounded"
						value={formData.weight}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Color */}
				<div>
					<label htmlFor="color" className="block font-medium mb-2">
						Color
					</label>
					<input
						type="text"
						id="color"
						name="color"
						className="w-full p-2 border border-gray-300 rounded"
						value={formData.color}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Reason for Surrender */}
				<div>
					<label htmlFor="reason" className="block font-medium mb-2">
						Reason for Surrender
					</label>
					<textarea
						id="reason"
						name="reason"
						className="w-full p-2 border border-gray-300 rounded"
						value={formData.reason}
						onChange={handleChange}
						required
					></textarea>
				</div>
				{/* IVDD Status */}
				<div>
					<label htmlFor="ivddStatus" className="block font-medium mb-2">
						IVDD Status
					</label>
					<input
						type="text"
						id="ivddStatus"
						name="ivddStatus"
						className="w-full p-2 border border-gray-300 rounded"
						value={formData.ivddStatus}
						onChange={handleChange}
						placeholder="E.g., Diagnosed/Not Diagnosed"
						required
					/>
				</div>
				{/* Health */}
				<div>
					<label htmlFor="health" className="block font-medium mb-2">
						Health
					</label>
					<textarea
						id="health"
						name="health"
						className="w-full p-2 border border-gray-300 rounded"
						value={formData.health}
						onChange={handleChange}
						placeholder="Describe any health concerns"
						required
					></textarea>
				</div>
				{/* Special Needs */}
				<div>
					<label htmlFor="specialNeeds" className="block font-medium mb-2">
						Special Needs
					</label>
					<textarea
						id="specialNeeds"
						name="specialNeeds"
						className="w-full p-2 border border-gray-300 rounded"
						value={formData.specialNeeds}
						onChange={handleChange}
						placeholder="Describe any special care requirements"
						required
					></textarea>
				</div>
				{/* Image Upload */}
				<div>
					<label htmlFor="images" className="block font-medium mb-2">
						Upload Images
					</label>
					<input
						type="file"
						id="images"
						name="images"
						accept="image/*"
						multiple
						onChange={handleFileChange}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Display previews if images are uploaded */}
				{selectedFiles.length > 0 && (
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
						{selectedFiles.map((file, index) => {
							const url = URL.createObjectURL(file);
							return (
								<img
									key={index}
									src={url}
									alt={`Preview ${index}`}
									className="w-full h-auto rounded"
								/>
							);
						})}
					</div>
				)}
				{/* Submit Button */}
				<div className="text-center">
					<button
						type="submit"
						className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
					>
						Submit Application
					</button>
				</div>
			</form>
		</div>
	);
}
