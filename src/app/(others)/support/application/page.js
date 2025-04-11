"use client";
import React, { useState } from "react";
import { uploadImage } from "../../../utils/uploadImage";

export default function CreateApplicationPage() {
	// State for text/number fields from your schema
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		streetAddress: "",
		city: "",
		state: "",
		zipCode: "",
		age: "",
		indoorOutdoor: "",
		humansInHouse: "",
		dogsInHouse: "",
		imageUrl: "", // Featured image URL (from Firebase)
		veternarianReference: "",
		personalReference: "",
		otherPets: "",
		misc: "",
	});

	// State for gallery images URLs (array)
	const [galleryUrls, setGalleryUrls] = useState([]);
	// Local file states for featured and gallery images
	const [featuredFile, setFeaturedFile] = useState(null);
	const [galleryFiles, setGalleryFiles] = useState([]);
	// Message state for feedback
	const [message, setMessage] = useState("");

	// Update form fields
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Handle featured image file input
	const handleFeaturedFileChange = (e) => {
		setFeaturedFile(e.target.files[0]);
	};

	// Handle gallery images file input (allow multiple)
	const handleGalleryFilesChange = (e) => {
		setGalleryFiles(Array.from(e.target.files));
	};

	// Upload the featured image to Firebase and update formData.imageUrl
	const handleUploadFeaturedImage = async () => {
		if (!featuredFile) return;
		try {
			const url = await uploadImage(featuredFile);
			setFormData((prev) => ({
				...prev,
				imageUrl: url,
			}));
		} catch (error) {
			console.error("Error uploading featured image:", error);
		}
	};

	// Upload gallery images to Firebase and update galleryUrls state
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

	// Client-side validation function
	const validateForm = () => {
		const errors = [];

		// Ensure specified text fields have at least 2 characters
		const fieldsToCheck = [
			"firstName",
			"lastName",
			"email",
			"phoneNumber",
			"streetAddress",
			"city",
			"state",
			"zipCode",
			"indoorOutdoor",
			"humansInHouse",
			"dogsInHouse",
			"otherPets",
		];

		fieldsToCheck.forEach((field) => {
			if (formData[field].trim().length < 2) {
				errors.push(`${field} must be at least 2 characters long.`);
			}
		});

		const fieldsToCheck2 = ["veterinarianReference", "personalReference"];

		fieldsToCheck2.forEach((field) => {
			if (formData[field].trim().length < 14) {
				errors.push(`${field} must be at least 14 characters long.`);
			}
		});

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			errors.push("Please enter a valid email address.");
		}

		// Validate phone number by stripping non-digits and ensuring it has at least 10 digits
		const phoneDigits = formData.phoneNumber.replace(/\D/g, "");
		if (phoneDigits.length < 10) {
			errors.push(
				"Please enter a valid phone number with at least 10 digits."
			);
		}

		return errors;
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Run validations
		const validationErrors = validateForm();
		if (validationErrors.length > 0) {
			setMessage(validationErrors.join(" "));
			return;
		}

		// Ensure featured image and gallery images are uploaded
		if (!formData.imageUrl && featuredFile) {
			await handleUploadFeaturedImage();
		}
		if (galleryFiles.length > 0 && galleryUrls.length === 0) {
			await handleUploadGalleryImages();
		}

		// Construct payload with proper types and include the gallery images
		const dataToSend = {
			...formData,
			age: Number(formData.age),
			images: galleryUrls,
		};

		try {
			const res = await fetch("/api/application/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(dataToSend),
			});
			if (res.ok) {
				setMessage("Application created successfully!");
				// Reset states
				setFormData({
					firstName: "",
					lastName: "",
					email: "",
					phoneNumber: "",
					streetAddress: "",
					city: "",
					state: "",
					zipCode: "",
					age: "",
					indoorOutdoor: "",
					humansInHouse: "",
					dogsInHouse: "",
					imageUrl: "",
					veternarianReference: "",
					personalReference: "",
					otherPets: "",
					misc: "",
				});
				setGalleryUrls([]);
				setFeaturedFile(null);
				setGalleryFiles([]);
			} else {
				const errorData = await res.json();
				setMessage(`Error: ${errorData.error}`);
			}
		} catch (error) {
			console.error("Error submitting application:", error);
			setMessage("Error submitting application");
		}
	};

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-4xl font-bold mb-8 text-center">Application</h1>
			<p className="text-lg mb-4 text-center bg-teal-100">
				Please fill out the form below. We will review your application and
				get back to you as soon as possible. To speed up your application,
				be specific and provide as much detail as possible. Missing
				information slows down the process considerably.
			</p>
			{message && <p className="mb-4 text-center text-lg">{message}</p>}
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 md:grid-cols-2 gap-6"
			>
				{/* First Name */}
				<div>
					<label
						htmlFor="firstName"
						className="block text-gray-700 font-medium mb-2"
					>
						First Name
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Last Name */}
				<div>
					<label
						htmlFor="lastName"
						className="block text-gray-700 font-medium mb-2"
					>
						Last Name
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Email */}
				<div>
					<label
						htmlFor="email"
						className="block text-gray-700 font-medium mb-2"
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
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Phone Number */}
				<div>
					<label
						htmlFor="phoneNumber"
						className="block text-gray-700 font-medium mb-2"
					>
						Phone Number
					</label>
					<input
						type="text"
						id="phoneNumber"
						name="phoneNumber"
						value={formData.phoneNumber}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Street Address */}
				<div>
					<label
						htmlFor="streetAddress"
						className="block text-gray-700 font-medium mb-2"
					>
						Street Address
					</label>
					<input
						type="text"
						id="streetAddress"
						name="streetAddress"
						value={formData.streetAddress}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* City */}
				<div>
					<label
						htmlFor="city"
						className="block text-gray-700 font-medium mb-2"
					>
						City
					</label>
					<input
						type="text"
						id="city"
						name="city"
						value={formData.city}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* State */}
				<div>
					<label
						htmlFor="state"
						className="block text-gray-700 font-medium mb-2"
					>
						State
					</label>
					<input
						type="text"
						id="state"
						name="state"
						value={formData.state}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Zip Code */}
				<div>
					<label
						htmlFor="zipCode"
						className="block text-gray-700 font-medium mb-2"
					>
						Zip Code
					</label>
					<input
						type="text"
						id="zipCode"
						name="zipCode"
						value={formData.zipCode}
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
				{/* Indoor/Outdoor */}
				<div>
					<label
						htmlFor="indoorOutdoor"
						className="block text-gray-700 font-medium mb-2"
					>
						Is the environment indoor or outdoor?
					</label>
					<input
						type="text"
						id="indoorOutdoor"
						name="indoorOutdoor"
						value={formData.indoorOutdoor}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Humans In House */}
				<div>
					<label
						htmlFor="humansInHouse"
						className="block text-gray-700 font-medium mb-2"
					>
						Humans In House with ages
					</label>
					<input
						type="text"
						id="humansInHouse"
						name="humansInHouse"
						value={formData.humansInHouse}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Dogs In House */}
				<div>
					<label
						htmlFor="dogsInHouse"
						className="block text-gray-700 font-medium mb-2"
					>
						Dogs In House, with temerament and ages
					</label>
					<input
						type="text"
						id="dogsInHouse"
						name="dogsInHouse"
						value={formData.dogsInHouse}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>

				{/* Featured Image Upload */}
				<div className="md:col-span-2">
					<label
						htmlFor="featuredImage"
						className="block text-gray-700 font-medium mb-2"
					>
						Upload Featured Image (Image of you/your family)
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
						Gallery Images (images of your house, yard, etc.)
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
				{/* Veterinarian Reference */}
				<div className="md:col-span-2">
					<label
						htmlFor="veternarianReference"
						className="block text-gray-700 font-medium mb-2"
					>
						Veterinarian Reference(name and phone number)
					</label>
					<input
						type="text"
						id="veternarianReference"
						name="veternarianReference"
						value={formData.veternarianReference}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Personal Reference */}
				<div className="md:col-span-2">
					<label
						htmlFor="personalReference"
						className="block text-gray-700 font-medium mb-2"
					>
						Personal Reference(name, phone number and relationship)
					</label>
					<input
						type="text"
						id="personalReference"
						name="personalReference"
						value={formData.personalReference}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Other Pets */}
				<div className="md:col-span-2">
					<label
						htmlFor="otherPets"
						className="block text-gray-700 font-medium mb-2"
					>
						Other Pets(list all pets in the house, including species and
						ages)
					</label>
					<input
						type="text"
						id="otherPets"
						name="otherPets"
						value={formData.otherPets}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Miscellaneous */}
				<div className="md:col-span-2">
					<label
						htmlFor="misc"
						className="block text-gray-700 font-medium mb-2"
					>
						Miscellaneous(anything else that might be helpful for us to
						know!)
					</label>
					<textarea
						id="misc"
						name="misc"
						value={formData.misc}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					></textarea>
				</div>
				{/* Submit Button */}
				<div className="md:col-span-2 text-center">
					<button
						type="submit"
						className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					>
						Submit Application
					</button>
				</div>
			</form>
		</div>
	);
}
