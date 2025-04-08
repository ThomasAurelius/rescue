import React from "react";

const VolunteeringAndFosteringPage = () => {
	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			{/* Page Title */}
			<h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
				Volunteering & Fostering
			</h1>

			{/* Introduction */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					A Short-Term, Flexible Commitment
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					Our fostering program offers a wonderful opportunity to help
					rescue dachshunds on a temporary basis. Fostering is a short-term
					commitment of unknown length, so please consider if you’re ready
					for a flexible, yet impactful role in a dog’s life.
				</p>
			</section>

			{/* Fostering Details */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Fostering Details
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					When you foster a dachshund, the Dachshund Rescue Group team of
					veterinarians takes care of all veterinary needs and associated
					costs during the foster period. This ensures the dog receives the
					necessary medical care without placing a financial burden on you.
				</p>
				<p className="text-lg text-gray-700">
					Your primary responsibility as a foster is to provide safe
					transportation for the dog when needed, whether it’s for vet
					appointments, transfers between foster homes, or other necessary
					movements.
				</p>
			</section>

			{/* Volunteering Opportunities */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Volunteering Opportunities
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					In addition to fostering, we welcome volunteers to help with
					various tasks, including:
				</p>
				<ul className="list-disc list-inside text-lg text-gray-700 mb-4">
					<li>Assisting with events and fundraising efforts</li>
					<li>Dog walking and exercise support</li>
					<li>Administrative and outreach activities</li>
				</ul>
				<p className="text-lg text-gray-700">
					Volunteering is a great way to contribute to our mission, and
					every bit of help makes a real difference.
				</p>
			</section>

			{/* How to Get Involved */}
			<section>
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					How to Get Involved
				</h2>
				<p className="text-lg text-gray-700">
					If you're interested in fostering or volunteering with the
					Dachshund Rescue Group, please reach out to us or fill out our
					online application. We’d love to discuss how you can help make a
					positive impact on the lives of our rescue dogs.
				</p>
			</section>
			<div className="text-center bg-teal-50 rounded-lg text-xl text-gray-600 mt-4">
				If you are ready to foster or volunteer, please fill out our{" "}
				<a className="text-blue-600 underline" href="/support/application">
					application
				</a>{" "}
				to get started.
			</div>
		</div>
	);
};

export default VolunteeringAndFosteringPage;
