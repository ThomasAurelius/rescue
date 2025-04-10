"use client";
import React, { useState } from "react";
import { uploadImage } from "../../../../utils/uploadImage";

const RegisterDog = () => {
	const [formData, setFormData] = useState({
		name: "",
		breed: "",
		age: "",
		description: "",
		color: "",
		sex: "Male", // default selection
		weight: "",
		activityLevel: "",
		indoorOutdoor: "",
		goodWithKids: "",
		goodWithPets: "",
		healthStatus: "",
		trainingLevel: "",
		specialNeeds: "",
		adoptionFee: "",
		species: "",
		companions: "", // comma-separated values
		size: "",
		imageUrl: "", // URL of the uploaded image
	});
	const [message, setMessage] = useState("");
	const [file, setFile] = useState(null);
	const [downloadUrl, setDownloadUrl] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Convert appropriate fields to numbers and companions to an array.
		const dataToSend = {
			...formData,
			age: Number(formData.age),
			weight: Number(formData.weight),
			adoptionFee: Number(formData.adoptionFee),
			companions: formData.companions
				.split(",")
				.map((item) => item.trim())
				.filter(Boolean),
		};

		try {
			const res = await fetch("/api/dogs/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataToSend),
			});

			if (res.ok) {
				setMessage("Dog registered successfully!");
				setFormData({
					name: "",
					breed: "",
					age: "",
					description: "",
					color: "",
					sex: "Male",
					weight: "",
					activityLevel: "",
					indoorOutdoor: "",
					goodWithKids: "",
					goodWithPets: "",
					healthStatus: "",
					trainingLevel: "",
					specialNeeds: "",
					adoptionFee: "",
					species: "",
					companions: "",
					size: "",
					imageUrl: "",
				});
				setDownloadUrl("");
			} else {
				const errorData = await res.json();
				setMessage(`Error: ${errorData.error}`);
			}
		} catch (error) {
			setMessage("Error registering dog");
			console.error(error);
		}
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleUpload = async () => {
		try {
			const url = await uploadImage(file);
			setDownloadUrl(url);
			// Update formData.imageUrl so it gets sent to MongoDB on submit.
			setFormData((prev) => ({
				...prev,
				imageUrl: url,
			}));
		} catch (error) {
			console.error("Error uploading image:", error);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center md:w-[calc(100vw-300px)] max-w-4xl mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
				Register a New Dog
			</h1>
			{message && (
				<p className="text-center text-xl text-green-600 mb-4">{message}</p>
			)}
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 md:grid-cols-2 gap-6"
			>
				<div>
					<input
						id="imageUrl"
						name="imageUrl"
						type="file"
						accept="image/*"
						onChange={handleFileChange}
					/>
					<button type="button" onClick={handleUpload}>
						Upload Image
					</button>
					{downloadUrl && <img src={downloadUrl} alt="Uploaded" />}
				</div>
				{/* Column 1 */}
				<div>
					<label
						htmlFor="name"
						className="block text-gray-700 font-medium mb-2"
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
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
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
				<div>
					<label
						htmlFor="color"
						className="block text-gray-700 font-medium mb-2"
					>
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
						htmlFor="intact"
						className="block text-gray-700 font-medium mb-2"
					>
						Intact
					</label>
					<input
						type="text"
						id="intact"
						name="intact"
						value={formData.intact}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Full width */}
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
				<div>
					<label
						htmlFor="weight"
						className="block text-gray-700 font-medium mb-2"
					>
						Weight
					</label>
					<input
						type="number"
						id="weight"
						name="weight"
						value={formData.weight}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div>
					<label
						htmlFor="activityLevel"
						className="block text-gray-700 font-medium mb-2"
					>
						Activity Level
					</label>
					<input
						type="text"
						id="activityLevel"
						name="activityLevel"
						value={formData.activityLevel}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div>
					<label
						htmlFor="indoorOutdoor"
						className="block text-gray-700 font-medium mb-2"
					>
						Indoor/Outdoor
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
				<div>
					<label
						htmlFor="goodWithKids"
						className="block text-gray-700 font-medium mb-2"
					>
						Good With Kids
					</label>
					<input
						type="text"
						id="goodWithKids"
						name="goodWithKids"
						value={formData.goodWithKids}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div>
					<label
						htmlFor="goodWithPets"
						className="block text-gray-700 font-medium mb-2"
					>
						Good With Pets
					</label>
					<input
						type="text"
						id="goodWithPets"
						name="goodWithPets"
						value={formData.goodWithPets}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Full width */}
				<div className="md:col-span-2">
					<label
						htmlFor="healthStatus"
						className="block text-gray-700 font-medium mb-2"
					>
						Health Status
					</label>
					<textarea
						id="healthStatus"
						name="healthStatus"
						value={formData.healthStatus}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					></textarea>
				</div>
				<div className="md:col-span-2">
					<label
						htmlFor="trainingLevel"
						className="block text-gray-700 font-medium mb-2"
					>
						Training Level
					</label>
					<textarea
						type="text"
						id="trainingLevel"
						name="trainingLevel"
						value={formData.trainingLevel}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				{/* Full width */}
				<div className="md:col-span-2">
					<label
						htmlFor="specialNeeds"
						className="block text-gray-700 font-medium mb-2"
					>
						Special Needs
					</label>
					<textarea
						id="specialNeeds"
						name="specialNeeds"
						value={formData.specialNeeds}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					></textarea>
				</div>
				<div>
					<label
						htmlFor="adoptionFee"
						className="block text-gray-700 font-medium mb-2"
					>
						Adoption Fee
					</label>
					<input
						type="number"
						id="adoptionFee"
						name="adoptionFee"
						value={formData.adoptionFee}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div>
					<label
						htmlFor="size"
						className="block text-gray-700 font-medium mb-2"
					>
						Size
					</label>
					<input
						type="text"
						id="size"
						name="size"
						value={formData.size}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div className="md:col-span-2">
					<label
						htmlFor="companions"
						className="block text-gray-700 font-medium mb-2"
					>
						Companions (comma separated)
					</label>
					<textarea
						type="text"
						id="companions"
						name="companions"
						value={formData.companions}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>

				{/* Submit button spanning both columns */}
				<div className="md:col-span-2 text-center">
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Register Dog
					</button>
				</div>
			</form>
		</div>
	);
};

export default RegisterDog;
