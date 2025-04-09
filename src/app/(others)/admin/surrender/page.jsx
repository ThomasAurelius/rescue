"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ViewSurrenderApplicationsPage() {
	const [applications, setApplications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchApplications = async () => {
			try {
				const res = await fetch("/api/surrender/get");
				if (res.ok) {
					const data = await res.json();
					setApplications(data.dogs);
				} else {
					setError("Failed to fetch applications.");
				}
			} catch (err) {
				console.error("Error fetching applications:", err);
				setError("Error fetching applications.");
			} finally {
				setLoading(false);
			}
		};

		fetchApplications();
	}, []);

	if (loading) {
		return (
			<div className="container mx-auto p-8">
				<p>Loading applications...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto p-8">
				<p className="text-red-500">{error}</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-4xl font-bold mb-8 text-center">
				Surrender Applications
			</h1>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-200">
					<thead>
						<tr className="bg-gray-100">
							<th className="px-4 py-2 border-b">Owner Name</th>
							<th className="px-4 py-2 border-b">Dog Name</th>
							<th className="px-4 py-2 border-b">Age</th>
							<th className="px-4 py-2 border-b">Breed</th>
							<th className="px-4 py-2 border-b">City</th>
							<th className="px-4 py-2 border-b">Health</th>
							<th className="px-4 py-2 border-b">IVDD Status</th>
							<th className="px-4 py-2 border-b">Notes</th>
							<th className="px-4 py-2 border-b">Actions</th>
						</tr>
					</thead>
					<tbody>
						{applications.map((app) => (
							<tr key={app._id} className="text-center hover:bg-gray-50">
								<td className="px-4 py-2 border-b">{app.ownerName}</td>
								<td className="px-4 py-2 border-b">{app.name}</td>
								<td className="px-4 py-2 border-b">{app.age}</td>
								<td className="px-4 py-2 border-b">{app.breed}</td>
								<td className="px-4 py-2 border-b">{app.ownerCity}</td>
								<td className="px-4 py-2 border-b">{app.health}</td>
								<td className="px-4 py-2 border-b">{app.ivddStatus}</td>
								<td className="px-4 py-2 border-b">{app.notes}</td>
								{/* Actions */}
								<td className="px-4 py-2 border-b space-x-2">
									<Link href={`/admin/surrender/${app._id}`}>
										<p className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded">
											View
										</p>
									</Link>
									<Link href={`/admin/surrender/edit/${app._id}`}>
										<p className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded">
											Edit
										</p>
									</Link>
								</td>
							</tr>
						))}
						{applications.length === 0 && (
							<tr>
								<td colSpan="6" className="px-4 py-2">
									No applications found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
