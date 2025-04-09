"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { uploadImage } from "../../../../../utils/uploadImage";

export default function EditSurrenderApplicationPage() {
	const params = useParams();
	const { id } = params;

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
		images: [], // existing image URLs
		notes: "",
	});

	const [selectedFiles, setSelectedFiles] = useState([]); // new files to upload
	const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

	const [loading, setLoading] = useState(true);
	const [updating, setUpdating] = useState(false);
	const [message, setMessage] = useState("");

	// Fetch the existing application details
	useEffect(() => {
		if (!id) return;
		const fetchApplication = async () => {
			try {
				const res = await fetch(`/api/surrender/get/${id}`);
				if (res.ok) {
					const data = await res.json();
					setFormData({
						ownerName: data.ownerName || "",
						ownerPhone: data.ownerPhone || "",
						ownerEmail: data.ownerEmail || "",
						ownerCity: data.ownerCity || "",
						name: data.name || "",
						age: data.age ? data.age.toString() : "",
						sex: data.sex || "Male",
						breed: data.breed || "",
						color: data.color || "",
						reason: data.reason || "",
						ivddStatus: data.ivddStatus || "",
						health: data.health || "",
						specialNeeds: data.specialNeeds || "",
						images: data.images || [],
						notes: data.notes || "",
					});
				} else {
					setMessage("Failed to load application data.");
				}
			} catch (error) {
				console.error("Error fetching application:", error);
				setMessage("An error occurred while fetching application data.");
			} finally {
				setLoading(false);
			}
		};
		fetchApplication();
	}, [id]);

	// Handle changes for text inputs and textareas
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Handle file input changes
	const handleFileChange = (e) => {
		setSelectedFiles(Array.from(e.target.files));
	};

	// Upload new images via Firebase
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

	// Handle form submission to update the application
	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setUpdating(true);

		// Decide which images to include: if new images were selected, upload them; otherwise use the existing ones.
		let imageUrls = formData.images;
		if (selectedFiles.length > 0) {
			const uploadedUrls = await handleUploadImages();
			imageUrls = uploadedUrls;
		}

		// Build the payload. Note: casting age to a number.
		const payload = {
			...formData,
			age: Number(formData.age),
			images: imageUrls,
		};

		try {
			const res = await fetch("/api/surrender/edit", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id, ...payload }),
			});

			if (res.ok) {
				setMessage("Application updated successfully!");
			} else {
				const data = await res.json();
				setMessage(`Error: ${data.error}`);
			}
		} catch (error) {
			console.error("Error updating application:", error);
			setMessage("Error updating application.");
		} finally {
			setUpdating(false);
		}
	};

	if (loading) {
		return (
			<div className="container mx-auto p-8">
				<p className="text-center">Loading application...</p>
			</div>
		);
	}

	return (
		<div className="w-[calc(100vw-300px)] flex flex-col justify-center items-center mx-auto p-8 ">
			<h1 className="text-4xl font-bold text-center mb-6">
				Edit Surrender Application
			</h1>
			{message && <p className="text-center mb-4 text-lg">{message}</p>}
			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Owner Information Section */}
				<h2 className="text-2xl font-bold mb-4">Owner Information</h2>
				<div className="grid grid-cols-1 w-3xl sm:grid-cols-2 gap-4">
					<div>
						<label htmlFor="ownerName" className="block font-medium mb-2">
							Owner Name
						</label>
						<input
							type="text"
							id="ownerName"
							name="ownerName"
							value={formData.ownerName}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded"
						/>
					</div>
					<div>
						<label
							htmlFor="ownerPhone"
							className="block font-medium mb-2"
						>
							Phone Number
						</label>
						<input
							type="tel"
							id="ownerPhone"
							name="ownerPhone"
							value={formData.ownerPhone}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded"
						/>
					</div>
					<div>
						<label
							htmlFor="ownerEmail"
							className="block font-medium mb-2"
						>
							Email
						</label>
						<input
							type="email"
							id="ownerEmail"
							name="ownerEmail"
							value={formData.ownerEmail}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded"
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
							value={formData.ownerCity}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded"
						/>
					</div>
				</div>

				{/* Dog Information Section */}
				<h2 className="text-2xl font-bold mb-4">Dog Information</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<label htmlFor="name" className="block font-medium mb-2">
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded"
						/>
					</div>
					<div>
						<label htmlFor="age" className="block font-medium mb-2">
							Age
						</label>
						<input
							type="number"
							id="age"
							name="age"
							value={formData.age}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded"
						/>
					</div>
					<div>
						<label htmlFor="sex" className="block font-medium mb-2">
							Sex
						</label>
						<select
							id="sex"
							name="sex"
							value={formData.sex}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded"
						>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</div>
					<div>
						<label htmlFor="breed" className="block font-medium mb-2">
							Breed
						</label>
						<input
							type="text"
							id="breed"
							name="breed"
							value={formData.breed}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded"
						/>
					</div>
					<div>
						<label htmlFor="color" className="block font-medium mb-2">
							Color
						</label>
						<input
							type="text"
							id="color"
							name="color"
							value={formData.color}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded"
						/>
					</div>
					<div>
						<label
							htmlFor="ivddStatus"
							className="block font-medium mb-2"
						>
							IVDD Status
						</label>
						<input
							type="text"
							id="ivddStatus"
							name="ivddStatus"
							value={formData.ivddStatus}
							onChange={handleChange}
							placeholder="E.g., Diagnosed/Not Diagnosed"
							required
							className="w-full p-2 border border-gray-300 rounded"
						/>
					</div>
				</div>
				<div>
					<label htmlFor="reason" className="block font-medium mb-2">
						Reason for Surrender
					</label>
					<textarea
						id="reason"
						name="reason"
						value={formData.reason}
						onChange={handleChange}
						required
						className="w-full h-[200px] p-2 border border-gray-300 rounded"
					></textarea>
				</div>
				<div className="grid">
					<div>
						<label htmlFor="health" className="block font-medium mb-2">
							Health
						</label>
						<textarea
							id="health"
							name="health"
							value={formData.health}
							onChange={handleChange}
							placeholder="Describe any health concerns"
							required
							className="w-full p-2 border border-gray-300 rounded"
						></textarea>
					</div>
				</div>
				<div>
					<label htmlFor="specialNeeds" className="block font-medium mb-2">
						Special Needs
					</label>
					<textarea
						id="specialNeeds"
						name="specialNeeds"
						value={formData.specialNeeds}
						onChange={handleChange}
						placeholder="Describe any special care requirements"
						required
						className="w-full h-[200px] p-2 border border-gray-300 rounded"
					></textarea>
				</div>
				<div>
					<label htmlFor="specialNeeds" className="block font-medium mb-2">
						Notes
					</label>
					<textarea
						id="notes"
						name="notes"
						value={formData.notes}
						onChange={handleChange}
						placeholder="Notes"
						required
						className="w-full h-[200px] p-2 border border-gray-300 rounded"
					></textarea>
				</div>

				{/* Image Upload Section */}
				<div>
					<label htmlFor="images" className="block font-medium mb-2">
						Upload New Images (optional)
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

				{/* Existing Images Preview */}
				{formData.images && formData.images.length > 0 && (
					<div>
						<h3 className="font-medium mb-2">Existing Images</h3>
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
							{formData.images.map((url, idx) => (
								<img
									key={idx}
									src={url}
									alt={`Existing Image ${idx + 1}`}
									className="w-full h-auto rounded"
								/>
							))}
						</div>
					</div>
				)}

				{/* New Uploaded Image Previews */}
				{selectedFiles.length > 0 && (
					<div>
						<h3 className="font-medium mb-2">New Image Previews</h3>
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
					</div>
				)}

				{/* Submit Button */}
				<div className="text-center">
					<button
						type="submit"
						disabled={updating}
						className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
					>
						{updating ? "Updating..." : "Update Application"}
					</button>
				</div>
			</form>
		</div>
	);
}
