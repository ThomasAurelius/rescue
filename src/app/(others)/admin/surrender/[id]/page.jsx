"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ViewSurrenderApplicationPage() {
	// Use the useParams hook to access dynamic route parameters
	const params = useParams();
	const { id } = params;
	const router = useRouter();

	const [application, setApplication] = useState(null);
	const [loading, setLoading] = useState(true);
	const [accepting, setAccepting] = useState(false);
	const [message, setMessage] = useState("");

	// Fetch the application details when the component mounts or when id changes
	useEffect(() => {
		if (!id) return;
		const fetchApplication = async () => {
			try {
				const res = await fetch(`/api/surrender/get/${id}`);
				if (res.ok) {
					const data = await res.json();
					setApplication(data);
				} else {
					setMessage("Failed to load the application.");
				}
			} catch (error) {
				console.error("Error fetching application:", error);
				setMessage("An error occurred while fetching the application.");
			} finally {
				setLoading(false);
			}
		};

		fetchApplication();
	}, [id]);

	// Handle the Accept action
	const handleAccept = async () => {
		setAccepting(true);
		setMessage("");
		try {
			const res = await fetch("/api/surrender/accept", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id }),
			});
			if (res.ok) {
				setMessage("Application accepted successfully!");
			} else {
				const errorData = await res.json();
				setMessage(`Error: ${errorData.error}`);
			}
		} catch (error) {
			console.error("Error accepting application:", error);
			setMessage("Error accepting application.");
		} finally {
			setAccepting(false);
		}
	};

	// Handle the Delete action with a confirmation prompt
	const handleDelete = async () => {
		const confirmed = window.confirm(
			"Are you sure you want to delete this application? This action cannot be undone."
		);
		if (!confirmed) return;

		setMessage("");
		try {
			const res = await fetch("/api/surrender/delete", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id }),
			});
			if (res.ok) {
				setMessage("Application deleted successfully!");
				// Redirect to the applications listing page after deletion
				router.push("/admin/surrender");
			} else {
				const errorData = await res.json();
				setMessage(`Error: ${errorData.error}`);
			}
		} catch (error) {
			console.error("Error deleting application:", error);
			setMessage("Error deleting application.");
		}
	};

	if (loading) {
		return (
			<div className="container mx-auto p-8">
				<p className="text-center">Loading application...</p>
			</div>
		);
	}

	if (!application) {
		return (
			<div className="container mx-auto p-8">
				<p className="text-center text-red-500">
					{message || "Application not found."}
				</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-8 max-w-3xl">
			<h1 className="text-4xl font-bold text-center mb-6">
				Application Details
			</h1>
			{message && <p className="text-center mb-4 text-lg">{message}</p>}
			<div className="bg-white shadow rounded p-6 space-y-4">
				{/* Owner Information */}
				<div>
					<h2 className="text-2xl font-semibold mb-2">
						Owner Information
					</h2>
					<p>
						<span className="font-medium">Name:</span>{" "}
						{application.ownerName}
					</p>
					<p>
						<span className="font-medium">Phone:</span>{" "}
						{application.ownerPhone}
					</p>
					<p>
						<span className="font-medium">Email:</span>{" "}
						{application.ownerEmail}
					</p>
					<p>
						<span className="font-medium">City:</span>{" "}
						{application.ownerCity}
					</p>
				</div>
				{/* Dog Information */}
				<div>
					<h2 className="text-2xl font-semibold mb-2">Dog Information</h2>
					<p>
						<span className="font-medium">Name:</span> {application.name}
					</p>
					<p>
						<span className="font-medium">Age:</span> {application.age}
					</p>
					<p>
						<span className="font-medium">Sex:</span> {application.sex}
					</p>
					<p>
						<span className="font-medium">Breed:</span>{" "}
						{application.breed}
					</p>
					<p>
						<span className="font-medium">Color:</span>{" "}
						{application.color}
					</p>
					<p>
						<span className="font-medium">Reason for Surrender:</span>{" "}
						{application.reason}
					</p>
					<p>
						<span className="font-medium">IVDD Status:</span>{" "}
						{application.ivddStatus}
					</p>
					<p>
						<span className="font-medium">Health:</span>{" "}
						{application.health}
					</p>
					<p>
						<span className="font-medium">Special Needs:</span>{" "}
						{application.specialNeeds}
					</p>
					<p>
						<span className="font-medium">Notes:</span>{" "}
						{application.notes}
					</p>
				</div>
				{/* Uploaded Images */}
				{application.images && application.images.length > 0 && (
					<div>
						<h2 className="text-2xl font-semibold mb-2">Images</h2>
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
							{application.images.map((url, idx) => (
								<img
									key={idx}
									src={url}
									alt={`Dog Image ${idx + 1}`}
									className="w-full h-auto rounded"
								/>
							))}
						</div>
					</div>
				)}
			</div>
			{/* Action Buttons */}
			<div className="mt-6 text-center">
				<button
					onClick={handleAccept}
					disabled={accepting}
					className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
				>
					{accepting ? "Accepting..." : "Accept Application"}
				</button>
				<Link href={`/admin/surrender/edit/${application._id}`}>
					<button className="bg-teal-500 text-white font-bold py-2 px-6 rounded ml-4">
						Edit Application
					</button>
				</Link>
				<button
					onClick={handleDelete}
					className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded ml-4"
				>
					Delete Application
				</button>
			</div>
		</div>
	);
}
