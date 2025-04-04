"use client";
import React, { useState } from "react";
import Link from "next/link";

const SponsorshipPage = () => {
	return (
		<div className="w-[calc(100vw-300px)] mx-auto px-4 py-8">
			{/* Page Title */}
			<h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
				Sponsor a Dachshund
			</h1>

			{/* Introduction */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Why Sponsor?
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					Sponsoring is a donation program that provides us with a stable
					foundation to plan for the future care of our dachshunds. Your
					support ensures we can cover essential expenses such as
					veterinary care, special treatments, and overall well-being,
					especially for dogs suffering from IVDD.
				</p>
				<p className="text-lg text-gray-700">
					By becoming a sponsor, you help us manage long-term care while
					giving our dogs the secure and loving environment they deserve.
				</p>
			</section>

			{/* How Sponsorship Works */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					How It Works
				</h2>
				<ul className="list-disc list-inside text-lg text-gray-700 mb-4">
					<li>
						Your sponsorship helps cover a years worth of routine
						veterinary care, special treatments, and other necessary
						expenses.
					</li>
					<li>
						Sponsorships provide us with the planning ability to offer
						continuous, high-quality care for our dachshunds, especially
						those with IVDD.
					</li>
					<li>
						You can choose to sponsor a specific dog or contribute to the
						general care of all our dachshunds.
					</li>
				</ul>
			</section>

			{/* Sponsorship Form */}
			<section>
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Become a Sponsor
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					Please fill out the form below to start sponsoring a dachshund.
					Your generous contribution makes a significant impact on our
					ability to provide consistent care and plan for the future.
				</p>

				<div className="flex items-center text-3xl justify-center">
					<Link href="/support/donations">
						<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
							Sponsor Now
						</button>
					</Link>
				</div>
			</section>
		</div>
	);
};

export default SponsorshipPage;
