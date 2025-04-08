"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { uploadImage } from "../../../../../utils/uploadImage";

export default function EditAdoptionPage() {
	const { id } = useParams();
	const [formData, setFormData] = useState({
		dogName: "",
		breed: "",
		age: "",
		description: "",
		familyName: "",
		sex: "Male",
		adoptionDate: "",
		imageUrl: "", // Featured image URL
	});
	const [galleryUrls, setGalleryUrls] = useState([]);
	const [featuredFile, setFeaturedFile] = useState(null);
	const [galleryFiles, setGalleryFiles] = useState([]);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(true);

	// Fetch existing adoption data
	useEffect(() => {
		async function fetchAdoption() {
			try {
				const res = await fetch(`/api/adoption/get/${id}`);
				if (!res.ok) {
					throw new Error("Failed to fetch adoption data");
				}
				const data = await res.json();
				// Assume API returns an adoption record directly
				setFormData({
					dogName: data.dogName || "",
					breed: data.breed || "",
					age: data.age || "",
					description: data.description || "",
					familyName: data.familyName || "",
					sex: data.sex || "Male",
					adoptionDate: data.adoptionDate
						? new Date(data.adoptionDate).toISOString().split("T")[0]
						: "",
					imageUrl: data.imageUrl || "",
				});
				setGalleryUrls(
					Array.isArray(data.images)
						? data.images
						: data.images
						? [data.images]
						: []
				);
			} catch (err) {
				console.error("Error fetching adoption:", err);
				setMessage("Error loading adoption data.");
			} finally {
				setLoading(false);
			}
		}
		if (id) fetchAdoption();
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFeaturedFileChange = (e) => {
		setFeaturedFile(e.target.files[0]);
	};

	const handleGalleryFilesChange = (e) => {
		setGalleryFiles(Array.from(e.target.files));
	};

	const handleUploadFeaturedImage = async () => {
		if (!featuredFile) return;
		try {
			const url = await uploadImage(featuredFile);
			setFormData((prev) => ({ ...prev, imageUrl: url }));
		} catch (error) {
			console.error("Error uploading featured image:", error);
		}
	};

	const handleUploadGalleryImages = async () => {
		if (!galleryFiles.length) return;
		try {
			const urls = await Promise.all(
				galleryFiles.map((file) => uploadImage(file))
			);
			setGalleryUrls(urls);
		} catch (error) {
			console.error("Error uploading gallery images:", error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Optionally upload images if files are provided
		if (featuredFile && !formData.imageUrl) {
			await handleUploadFeaturedImage();
		}
		if (galleryFiles.length > 0 && galleryUrls.length === 0) {
			await handleUploadGalleryImages();
		}

		const dataToSend = {
			id, // include the adoption ID
			...formData,
			age: Number(formData.age),
			adoptionDate: new Date(formData.adoptionDate),
			images: galleryUrls,
		};

		try {
			const res = await fetch("/api/adoptions/edit", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(dataToSend),
			});
			if (res.ok) {
				setMessage("Adoption updated successfully!");
			} else {
				const errorData = await res.json();
				setMessage(`Error: ${errorData.error}`);
			}
		} catch (error) {
			console.error("Error updating adoption:", error);
			setMessage("Error updating adoption");
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p>Loading adoption data...</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-4xl font-bold mb-8 text-center">Edit Adoption</h1>
			{message && <p className="mb-4 text-center text-lg">{message}</p>}
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 md:grid-cols-2 gap-6"
			>
				{/* Dog Name */}
				<div>
					<label
						htmlFor="dogName"
						className="block text-gray-700 font-medium mb-2"
					>
						Dog Name
					</label>
					<input
						type="text"
						id="dogName"
						name="dogName"
						value={formData.dogName}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Breed */}
				<div>
					<label
						htmlFor="breed"
						className="block text-gray-700 font-medium mb-2"
					>
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
				{/* Age */}
				<div>
					<label
						htmlFor="age"
						className="block text-gray-700 font-medium mb-2"
					>
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
				{/* Family Name */}
				<div>
					<label
						htmlFor="familyName"
						className="block text-gray-700 font-medium mb-2"
					>
						Family Name
					</label>
					<input
						type="text"
						id="familyName"
						name="familyName"
						value={formData.familyName}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Sex */}
				<div>
					<label
						htmlFor="sex"
						className="block text-gray-700 font-medium mb-2"
					>
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
				{/* Adoption Date */}
				<div>
					<label
						htmlFor="adoptionDate"
						className="block text-gray-700 font-medium mb-2"
					>
						Adoption Date
					</label>
					<input
						type="date"
						id="adoptionDate"
						name="adoptionDate"
						value={formData.adoptionDate}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Description */}
				<div className="md:col-span-2">
					<label
						htmlFor="description"
						className="block text-gray-700 font-medium mb-2"
					>
						Description
					</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					></textarea>
				</div>
				{/* Featured Image Upload */}
				<div className="md:col-span-2">
					<label
						htmlFor="featuredImage"
						className="block text-gray-700 font-medium mb-2"
					>
						Featured Image
					</label>
					<input
						type="file"
						id="featuredImage"
						name="featuredImage"
						accept="image/*"
						onChange={handleFeaturedFileChange}
						className="w-full p-2 border border-gray-300 rounded"
					/>
					<button
						type="button"
						onClick={handleUploadFeaturedImage}
						className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Upload Featured Image
					</button>
					{formData.imageUrl && (
						<div className="mt-2">
							<img
								src={formData.imageUrl}
								alt="Featured"
								className="w-32 h-auto rounded"
							/>
						</div>
					)}
				</div>
				{/* Gallery Images Upload */}
				<div className="md:col-span-2">
					<label
						htmlFor="galleryImages"
						className="block text-gray-700 font-medium mb-2"
					>
						Gallery Images
					</label>
					<input
						type="file"
						id="galleryImages"
						name="galleryImages"
						accept="image/*"
						multiple
						onChange={handleGalleryFilesChange}
						className="w-full p-2 border border-gray-300 rounded"
					/>
					<button
						type="button"
						onClick={handleUploadGalleryImages}
						className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Upload Gallery Images
					</button>
					{galleryUrls.length > 0 && (
						<div className="mt-2 grid grid-cols-3 gap-2">
							{galleryUrls.map((url, idx) => (
								<img
									key={idx}
									src={url}
									alt={`Gallery ${idx + 1}`}
									className="w-full h-auto rounded"
								/>
							))}
						</div>
					)}
				</div>
				{/* Submit Button */}
				<div className="md:col-span-2 text-center">
					<button
						type="submit"
						className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					>
						Update Adoption
					</button>
				</div>
			</form>
		</div>
	);
}
