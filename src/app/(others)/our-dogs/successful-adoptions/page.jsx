"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdoptionsListingPage() {
	const [adoptions, setAdoptions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchAdoptions() {
			try {
				const res = await fetch("/api/adoption/get", {
					credentials: "include",
				});
				if (!res.ok) {
					throw new Error("Failed to fetch adoptions");
				}
				const data = await res.json();
				console.log("Fetched adoption data:", data);
				let adoptionsData = [];

				// Handle different response structures:
				if (Array.isArray(data)) {
					// API returned an array directly.
					adoptionsData = data;
				} else if (data.adoptions) {
					// API returned an object with an "adoptions" property.
					adoptionsData = Array.isArray(data.adoptions)
						? data.adoptions
						: [data.adoptions];
				} else if (typeof data === "object" && data !== null) {
					// API returned a single adoption object.
					adoptionsData = [data];
				}

				setAdoptions(adoptionsData);
			} catch (err) {
				console.error("Error fetching adoptions:", err);
				setError("Could not load adoptions.");
			} finally {
				setLoading(false);
			}
		}
		fetchAdoptions();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p>Loading adoptions...</p>
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

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-4xl font-bold mb-8 text-center">Adoptions</h1>
			{adoptions.length === 0 ? (
				<p className="text-center">No adoptions available.</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{adoptions.map((adoption) => (
						<Link
							key={adoption._id}
							href={`/our-dogs/successful-adoptions/${adoption._id}`}
						>
							<div className="bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow">
								<div className="relative h-48 w-full">
									<Image
										src={adoption.imageUrl}
										alt={adoption.dogName}
										width={400}
										height={300}
										className="rounded-t-lg object-cover"
									/>
								</div>
								<div className="flex flex-col justify-center items-center p-2">
									<h2 className="text-xl font-bold">
										{adoption.dogName}
									</h2>
									<p>Age: {adoption.age}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
