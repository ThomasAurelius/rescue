"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const SuccessfulAdoptionPage = () => {
	const { id } = useParams();
	const [adoption, setAdoption] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);

	useEffect(() => {
		async function fetchAdoption() {
			try {
				const res = await fetch(`/api/adoption/get/${id}`);
				if (!res.ok) {
					throw new Error("Failed to fetch adoption data");
				}
				const data = await res.json();
				// Assume the API returns the adoption record directly
				setAdoption(data);
			} catch (err) {
				console.error("Error fetching adoption:", err);
				setError("Could not load adoption data.");
			} finally {
				setLoading(false);
			}
		}
		if (id) fetchAdoption();
	}, [id]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p>Loading adoption data...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-red-500">{error}</p>
			</div>
		);
	}

	if (!adoption) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p>No adoption data available.</p>
			</div>
		);
	}

	// Ensure galleryImages is always an array:
	const galleryImages = Array.isArray(adoption.images)
		? adoption.images
		: adoption.images
		? [adoption.images]
		: [];

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-4xl font-bold mb-8 text-center">
				Successful Adoption
			</h1>
			<div className="bg-white shadow-md rounded-lg p-6">
				{/* Large Featured Image */}
				<div className="mb-6">
					<Image
						src={adoption.imageUrl}
						alt={adoption.dogName}
						width={600}
						height={400}
						className="rounded-lg"
					/>
				</div>
				{/* Dog & Adoption Details */}
				<h2 className="text-3xl font-bold mb-2">{adoption.dogName}</h2>
				<p className="text-lg mb-1">Breed: {adoption.breed}</p>
				<p className="text-lg mb-1">Age: {adoption.age} years</p>
				<p className="text-lg mb-1">
					Adopted by the {adoption.familyName} family on{" "}
					{new Date(adoption.adoptionDate).toLocaleDateString()}
				</p>
				<p className="text-md mb-4">{adoption.description}</p>
				{/* Gallery of Smaller Images */}
				<div>
					<h3 className="text-2xl font-bold mb-3">Gallery</h3>
					{galleryImages.length > 0 ? (
						<div className="grid grid-cols-3 gap-2">
							{galleryImages.map((imgUrl, index) => (
								<img
									key={index}
									src={imgUrl}
									alt={`Gallery ${index + 1}`}
									className="w-full h-auto rounded cursor-pointer hover:opacity-75"
									onClick={() => setSelectedImage(imgUrl)}
								/>
							))}
						</div>
					) : (
						<p>No gallery images available.</p>
					)}
				</div>
			</div>

			{/* Modal for Enlarged Image */}
			{selectedImage && (
				<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
					<div className="relative">
						<img
							src={selectedImage}
							alt="Enlarged view"
							className="max-h-screen max-w-full rounded"
						/>
						<button
							onClick={() => setSelectedImage(null)}
							className="absolute top-0 right-0 m-4 text-white text-3xl"
						>
							&times;
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default SuccessfulAdoptionPage;
