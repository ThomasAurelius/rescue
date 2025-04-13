"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdoptionsListPage() {
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
				// Handle the case where the API might return an object with "adoptions" key or an array directly.
				const adoptionList = data.adoptions ? data.adoptions : data;
				setAdoptions(adoptionList);
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
				<>
					{/* Card view for screens md and smaller */}
					<div className="block md:hidden grid grid-cols-1 gap-6">
						{adoptions.map((adoption) => (
							<div
								key={adoption._id}
								className="bg-white border border-gray-200 rounded shadow p-4"
							>
								<div className="flex items-center">
									<div className="relative w-20 h-16 mr-4">
										<Image
											src={adoption.imageUrl}
											alt={adoption.dogName}
											fill
											sizes="100px"
											className="object-cover rounded"
										/>
									</div>
									<div>
										<h2 className="text-xl font-bold">
											{adoption.dogName}
										</h2>
										<p className="text-gray-600">{adoption.breed}</p>
										<p className="text-gray-600">
											{adoption.age} years
										</p>
									</div>
								</div>
								<p className="mt-2 text-gray-500">
									{new Date(
										adoption.adoptionDate
									).toLocaleDateString()}
								</p>
								<div className="mt-4">
									<Link href={`/adoptions/${adoption._id}`}>
										<span className="text-blue-500 hover:underline mr-2">
											View
										</span>
									</Link>
									<Link href={`/admin/adoption/edit/${adoption._id}`}>
										<span className="text-blue-500 hover:underline">
											Edit
										</span>
									</Link>
								</div>
							</div>
						))}
					</div>

					{/* Table view for screens larger than md */}
					<div className="hidden md:block overflow-x-auto">
						<table className="min-w-full bg-white border border-gray-200">
							<thead>
								<tr className="bg-gray-200">
									<th className="py-3 px-4 border-b border-gray-200 text-left">
										Image
									</th>
									<th className="py-3 px-4 border-b border-gray-200 text-left">
										Dog Name
									</th>
									<th className="py-3 px-4 border-b border-gray-200 text-left">
										Breed
									</th>
									<th className="py-3 px-4 border-b border-gray-200 text-left">
										Age
									</th>
									<th className="py-3 px-4 border-b border-gray-200 text-left">
										Adoption Date
									</th>
									<th className="py-3 px-4 border-b border-gray-200 text-left">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{adoptions.map((adoption) => (
									<tr key={adoption._id} className="hover:bg-gray-100">
										<td className="py-3 px-4 border-b border-gray-200">
											<div className="relative w-20 h-16">
												<Image
													src={adoption.imageUrl}
													alt={adoption.dogName}
													fill
													sizes="100px"
													className="object-cover rounded"
												/>
											</div>
										</td>
										<td className="py-3 px-4 border-b border-gray-200">
											{adoption.dogName}
										</td>
										<td className="py-3 px-4 border-b border-gray-200">
											{adoption.breed}
										</td>
										<td className="py-3 px-4 border-b border-gray-200">
											{adoption.age} years
										</td>
										<td className="py-3 px-4 border-b border-gray-200">
											{new Date(
												adoption.adoptionDate
											).toLocaleDateString()}
										</td>
										<td className="py-3 px-4 border-b border-gray-200">
											<Link href={`/adoptions/${adoption._id}`}>
												<span className="text-blue-500 hover:underline">
													View
												</span>
											</Link>
											<span className="mx-2">|</span>
											<Link
												href={`/admin/adoption/edit/${adoption._id}`}
											>
												<span className="text-blue-500 hover:underline">
													Edit
												</span>
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</>
			)}
		</div>
	);
}
