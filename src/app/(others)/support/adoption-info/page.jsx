import React from "react";
import Link from "next/link";

const AdoptDachshundPage = () => {
	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			{/* Page Title */}
			<h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
				Adopting a Dachshund from Our Rescue
			</h1>

			{/* Commitment Section */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Commitment to a Lifelong Bond
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					Adopting a dachshund from our rescue is a long-term commitment.
					Our dogs thrive in loving, stable, and permanent homes. They
					require ongoing veterinary care, regular exercise, and plenty of
					attention. If you're ready to welcome a new family member into
					your life, please read on for more details about our adoption
					process.
				</p>
			</section>

			{/* Screening Application */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Screening Application
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					To ensure that every dog finds a safe and nurturing environment,
					we require all prospective adopters to complete a thorough
					screening application. This process helps us evaluate your living
					situation, past experience with pets, and overall readiness to
					provide a permanent home.
				</p>
			</section>

			{/* Ongoing Veterinary Care */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Ongoing Veterinary Care
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					Dachshunds are known for their unique health needs, especially
					due to their long backs which make them susceptible to certain
					conditions. Regular veterinary check-ups, preventive care, and
					sometimes special treatments are essential to ensure their
					well-being.
				</p>
			</section>

			{/* Permanent Adoption */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Permanent Adoption
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					Our adoptions are intended to be permanent. We ask that you
					carefully consider your ability to commit to a lifelong
					relationship with your new pet. This commitment helps us ensure
					that our dogs are placed in homes that will provide consistent
					love and care.
				</p>
			</section>

			{/* Next Steps */}
			<section>
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Next Steps
				</h2>
				<p className="text-lg text-gray-700">
					If you believe you are ready to make a lifelong commitment to a
					dachshund, please complete our screening application. Our team
					will review your information and reach out to discuss the next
					steps in the adoption process. Thank you for considering adoption
					from our rescue.
				</p>
			</section>
			<div className="flex items-center justify-center mt-8">
				<button className=" bg-blue-500 cursor-pointer text-white font-bold py-2 px-4 rounded mt-6 hover:bg-blue-700 transition duration-300">
					<Link href="/support/application">Start Your Application</Link>
				</button>
			</div>
		</div>
	);
};

export default AdoptDachshundPage;
