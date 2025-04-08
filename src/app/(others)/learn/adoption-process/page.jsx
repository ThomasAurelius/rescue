import React from "react";

const AdoptionProcessPage = () => {
	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			{/* Page Title */}
			<h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
				Adoption Process
			</h1>

			{/* Introduction */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Introduction
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					Our adoption process is designed to ensure that every placement
					is made with careful consideration, leading to happy, lasting
					adoptions. We take the time to get to know you and your living
					situation to make sure our dogs find a loving, supportive home.
				</p>
			</section>

			{/* Step 1: Application */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Step 1: Application
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					Prospective adopters are required to complete a detailed
					application form. This helps us understand your background, your
					experience with pets, and your lifestyle.
				</p>
				<ul className="list-disc list-inside text-lg text-gray-700">
					<li>Personal information and contact details</li>
					<li>Living arrangements and household environment</li>
					<li>Past pet ownership experience</li>
					<li>Reasons for wanting to adopt</li>
				</ul>
			</section>

			{/* Step 2: Background Check */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Step 2: Background Check
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					A thorough background check is conducted to ensure that our dogs
					are placed in safe and suitable homes. This helps verify your
					history with pet ownership and ensures a secure environment for
					our pets.
				</p>
			</section>

			{/* Step 3: Home Evaluation */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Step 3: Home Evaluation
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					A home evaluation is either conducted in-person or virtually.
					During this evaluation, we assess your living environment to
					ensure it is safe and appropriate for a dog.
				</p>
				<p className="text-lg text-gray-700">
					This step may involve checking for adequate space, a secure yard,
					and other factors that contribute to the pet's well-being.
				</p>
			</section>

			{/* Step 4: Consideration of Other Pets */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Step 4: Consideration of Other Pets
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					We take into account any existing pets in your household to
					ensure a harmonious environment for everyone. This includes
					discussing pet compatibility and any necessary adjustments to
					accommodate a new family member.
				</p>
			</section>

			{/* Step 5: Adoption Fee */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Step 5: Adoption Fee
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					An adoption fee is required to help cover the costs of veterinary
					care, food, and other related expenses. This fee is also a
					commitment to the long-term care and well-being of the dog.
				</p>
			</section>

			{/* Conclusion */}
			<section>
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Conclusion
				</h2>
				<p className="text-lg text-gray-700">
					Our comprehensive adoption process ensures that our dogs are
					matched with the right families. By carefully reviewing each
					application and taking the time to evaluate every detail, we work
					together to create successful, lasting adoptions.
				</p>
			</section>
			<div className="text-center bg-teal-50 rounded-lg text-xl text-gray-600 mt-4">
				If you are ready to adopt, please fill out our{" "}
				<a className="text-blue-600 underline" href="/support/application">
					adoption application
				</a>{" "}
				to get started.
			</div>
		</div>
	);
};

export default AdoptionProcessPage;
