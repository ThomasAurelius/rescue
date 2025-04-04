"use client";
import React, { useState, useEffect } from "react";

const DogForm = ({ initialData = {}, onSubmit, isEditMode = false }) => {
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
		...initialData,
	});

	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// If in edit mode and initialData changes (e.g., after fetch), update form
	useEffect(() => {
		if (isEditMode && Object.keys(initialData).length > 0) {
			// Convert companions array to comma-separated string if needed
			const companions = Array.isArray(initialData.companions)
				? initialData.companions.join(", ")
				: initialData.companions || "";

			setFormData({
				...initialData,
				companions,
			});
		}
	}, [initialData, isEditMode]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage("");

		// Convert appropriate fields to numbers and companions to an array
		const dataToSend = {
			...formData,
			age: Number(formData.age) || 0,
			weight: Number(formData.weight) || 0,
			adoptionFee: Number(formData.adoptionFee) || 0,
			companions: formData.companions
				? formData.companions
						.split(",")
						.map((item) => item.trim())
						.filter(Boolean)
				: [],
		};

		// Remove _id from the data to send if it exists (MongoDB doesn't allow updating _id)
		if (dataToSend._id) {
			delete dataToSend._id;
		}

		try {
			await onSubmit(dataToSend);
			setMessage(
				isEditMode
					? "Dog updated successfully!"
					: "Dog registered successfully!"
			);

			if (!isEditMode) {
				// Only reset form for new registrations, not edits
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
				});
			}
		} catch (error) {
			setMessage(`Error: ${error.message || "Something went wrong"}`);
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	// The rest of the component remains the same as in my previous response
	// ... (form JSX)

	return (
		<div className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
				{isEditMode ? "Edit Dog Information" : "Register a New Dog"}
			</h1>

			{message && (
				<div
					className={`text-center text-xl mb-4 p-3 rounded-md ${
						message.includes("Error")
							? "bg-red-100 text-red-700"
							: "bg-green-100 text-green-700"
					}`}
				>
					{message}
				</div>
			)}

			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
			>
				{/* Form fields remain the same as in previous response */}
				{/* ... */}

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
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
						rows="3"
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
						rows="2"
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
						id="trainingLevel"
						name="trainingLevel"
						value={formData.trainingLevel}
						onChange={handleChange}
						required
						rows="2"
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
						rows="2"
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>
				<div>
					<label
						htmlFor="species"
						className="block text-gray-700 font-medium mb-2"
					>
						Species
					</label>
					<input
						type="text"
						id="species"
						name="species"
						value={formData.species}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
						id="companions"
						name="companions"
						value={formData.companions}
						onChange={handleChange}
						required
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				{/* Submit button spanning both columns */}
				<div className="md:col-span-2 text-center mt-4">
					<button
						type="submit"
						disabled={isLoading}
						className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md disabled:opacity-50"
					>
						{isLoading ? (
							<span>Processing...</span>
						) : isEditMode ? (
							"Update Dog Information"
						) : (
							"Register Dog"
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default DogForm;
