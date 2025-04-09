import React from "react";

const supporters = [
	{
		id: 1,
		name: "Happy Paws Pet Supplies",
		description:
			"A local pet supply store offering exclusive discounts for our rescue.",
		logo: "/assets/happypaws.png",
	},
	{
		id: 2,
		name: "PupCare Veterinary Clinic",
		description:
			"Veterinary care with special rates for rescue pets and their families.",
		logo: "/assets/pupcare.png",
	},
	{
		id: 3,
		name: "Bark & Bite Cafe",
		description:
			"A dog-friendly cafe that sponsors our events and supports rescue efforts.",
		logo: "/assets/barkbite.png",
	},
	{
		id: 4,
		name: "Canine Couture",
		description:
			"Fashionable accessories and apparel for your furry friends, with rescue discounts.",
		logo: "/assets/caninecouture.png",
	},
	{
		id: 5,
		name: "Pawsome Grooming",
		description:
			"Quality grooming services for dogs, offering exclusive deals for rescue adoptions.",
		logo: "/assets/pawsome.png",
	},
	{
		id: 6,
		name: "Furry Friends Insurance",
		description:
			"Insurance packages for pet owners with special rates for rescue animals.",
		logo: "/assets/furryfriends.png",
	},
];

const OurSupportersPage = () => {
	return (
		<div className="max-w-6xl mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
				Our Supporters
			</h1>
			<p className="text-lg text-gray-700 text-center mb-12">
				We are proud to partner with local businesses that help support our
				rescue efforts by providing discounts, services, and care for our
				beloved dachshunds. Please patronize these businesses and thank them
				for their support!
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{supporters.map((business) => (
					<div
						key={business.id}
						className="bg-white shadow-md rounded-lg p-6"
					>
						<div className="flex items-center mb-4">
							<img
								src={business.logo}
								alt={`${business.name} Logo`}
								className="h-16 w-16 object-cover rounded-full mr-4"
							/>
							<h2 className="text-2xl font-semibold text-gray-800">
								{business.name}
							</h2>
						</div>
						<p className="text-gray-700">{business.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default OurSupportersPage;
