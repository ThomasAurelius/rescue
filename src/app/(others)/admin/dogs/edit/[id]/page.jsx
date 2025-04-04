"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DogForm from "../../../../../components/DogForm";

export default function EditDogPage() {
	const router = useRouter();
	const { id } = useParams(); // Get id from the route parameters
	const [dog, setDog] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [debugInfo, setDebugInfo] = useState(null);

	useEffect(() => {
		const fetchDog = async () => {
			try {
				console.log("Fetching dog with ID:", id);

				// Add debugging info
				setDebugInfo({
					startTime: new Date().toISOString(),
					id: id,
					endpoint: `/api/dogs/get/${id}`,
				});

				const response = await fetch(`/api/dogs/get/${id}`);

				// Log the response status
				console.log("Response status:", response.status);
				setDebugInfo((prev) => ({
					...prev,
					responseStatus: response.status,
					responseOk: response.ok,
				}));

				if (!response.ok) {
					const errorData = await response.json();
					console.error("Error response:", errorData);

					setDebugInfo((prev) => ({
						...prev,
						errorData: errorData,
					}));

					throw new Error(
						`Failed to fetch dog: ${
							errorData.error || response.statusText
						}`
					);
				}

				const data = await response.json();
				console.log("Dog data received:", data);

				setDebugInfo((prev) => ({
					...prev,
					dataReceived: !!data,
					dataHasId: data && (data._id || data.id) ? true : false,
				}));

				setDog(data);
			} catch (err) {
				console.error("Error fetching dog:", err);
				setError(err.message);

				setDebugInfo((prev) => ({
					...prev,
					errorCaught: err.message,
				}));
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			// Check if ID is valid MongoDB ObjectId format (24 character hex string)
			const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
			console.log("Is valid ObjectId format?", isValidObjectId);

			if (!isValidObjectId) {
				setError(`Invalid MongoDB ObjectId format: ${id}`);
				setLoading(false);
				return;
			}

			fetchDog();
		}
	}, [id]);

	const handleSubmit = async (formData) => {
		try {
			// Remove _id from formData if it exists
			const { _id, ...dataToSubmit } = formData;

			const response = await fetch(`/api/dogs/edit`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id, ...dataToSubmit }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to update dog");
			}

			// Navigate back to dog details or list page after successful update
			router.push(`/dogs/${id}`); // Adjust this path as needed
		} catch (error) {
			console.error("Error updating dog:", error);
			setError(error.message);
			return Promise.reject(error);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="bg-red-100 text-red-700 p-4 rounded-md max-w-md">
					<h2 className="text-xl font-bold mb-2">Error</h2>
					<p>{error}</p>

					{/* Debug information */}
					{debugInfo && (
						<div className="mt-4 p-3 bg-gray-100 rounded text-xs">
							<h3 className="font-bold">Debug Info:</h3>
							<pre>{JSON.stringify(debugInfo, null, 2)}</pre>
						</div>
					)}

					<button
						onClick={() => router.back()}
						className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	// Check if dog data is empty
	const isDogEmpty = !dog || Object.keys(dog).length === 0;

	return (
		<div className="container mx-auto py-8">
			{isDogEmpty ? (
				<div className="bg-yellow-100 text-yellow-700 p-4 rounded-md max-w-md mx-auto">
					<h2 className="text-xl font-bold mb-2">No Dog Data Found</h2>
					<p>The dog with ID {id} was not found or returned empty data.</p>

					{/* Debug information */}
					{debugInfo && (
						<div className="mt-4 p-3 bg-gray-100 rounded text-xs">
							<h3 className="font-bold">Debug Info:</h3>
							<pre>{JSON.stringify(debugInfo, null, 2)}</pre>
						</div>
					)}

					<button
						onClick={() => router.back()}
						className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
					>
						Go Back
					</button>
				</div>
			) : (
				<DogForm
					initialData={dog}
					onSubmit={handleSubmit}
					isEditMode={true}
				/>
			)}
		</div>
	);
}
