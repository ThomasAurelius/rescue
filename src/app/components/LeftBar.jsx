"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const LeftBar = () => {
	const [featuredDog, setFeaturedDog] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchFeaturedDog() {
			try {
				const res = await fetch("/api/dogs/get");
				if (!res.ok) {
					throw new Error("Failed to fetch featured dog");
				}
				const data = await res.json();
				// Assuming the API returns { dog: { ... } }
				setFeaturedDog(data.dog);
			} catch (err) {
				console.error("Error fetching featured dog:", err);
				setError("Could not load featured dog");
			} finally {
				setLoading(false);
			}
		}
		fetchFeaturedDog();
	}, []);

	return (
		<div className="flex flex-col max-[600px]:hidden w-[300px] h-screen">
			<section className="flex flex-col bg-teal-50 shadow-[7px_9px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-lg items-center justify-center p-4">
				<h1 className="text-2xl font-bold">Featured Dog</h1>
				{loading ? (
					<p className="mt-4">Loading featured dog...</p>
				) : error ? (
					<p className="mt-4 text-red-500">{error}</p>
				) : featuredDog ? (
					<>
						<Image
							src={featuredDog.imageUrl || "/assets/placeholder.jpg"}
							alt={featuredDog.name || "Featured Dog"}
							width="200"
							height="200"
							className="rounded-lg mt-4"
						/>
						<p className="text-md mt-2">Name: {featuredDog.name}</p>
						<p className="text-md">Age: {featuredDog.age} years</p>
						<p className="text-md">Breed: {featuredDog.breed}</p>

						<Link href="/support/adoption-info">
							<button className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 mb-2 px-4 rounded mt-4">
								Adopt Me!
							</button>
						</Link>
					</>
				) : (
					<p className="mt-4">No featured dog available.</p>
				)}
			</section>
			{/* Other sections remain unchanged */}
			<section className="flex flex-col bg-teal-50 shadow-[7px_9px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-lg items-center justify-center mt-4">
				<h1 className="text-xl py-2 text-center font-bold">
					Make a difference in a dog's life!
				</h1>
				<p className="text-2xl mt-2">Donate today!</p>
				<Link href="/support/donations">
					<button className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 mt-4">
						Donate
					</button>
				</Link>
			</section>
			<section className="flex flex-col bg-teal-50 shadow-[7px_9px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-lg items-center justify-center mt-4">
				<h1 className="text-xl py-2 text-center font-bold">
					Follow us on Social Media!
				</h1>
				<div className="flex space-x-4 my-2">
					<a
						href="https://www.facebook.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src="/assets/facebook.png"
							alt="Facebook"
							width="40"
							height="40"
						/>
					</a>
					<a
						href="https://www.instagram.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src="/assets/instagram.png"
							alt="Instagram"
							width="40"
							height="40"
						/>
					</a>
				</div>
			</section>
			<section className="flex flex-col bg-teal-50 shadow-[7px_9px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-lg items-center justify-center mt-4">
				<h1 className="text-xl py-2 text-center font-bold">
					Sign up for our Newsletter!
				</h1>
				<input
					type="email"
					placeholder="Enter your email"
					className="border-2 border-gray-300 bg-white rounded-lg p-2 mb-2"
				/>
				<button
					className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 mt-4"
					onClick={() => alert("Subscribed!")}
				>
					Subscribe
				</button>
			</section>
			<section className="flex flex-col bg-teal-50 shadow-[7px_9px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-lg items-center justify-center mt-4">
				<h1 className="text-xl p-2 text-center font-bold">
					Shop our partners and support us!
				</h1>
				<Image
					src="/assets/facebookbadge.gif"
					alt="Shop"
					width="200"
					height="200"
					className="rounded-lg mt-4 my-2"
				/>
				<Image
					src="/assets/amazon.gif"
					alt="Shop"
					width="200"
					height="200"
					className="rounded-lg mt-4 my-2"
				/>
			</section>
		</div>
	);
};

export default LeftBar;
