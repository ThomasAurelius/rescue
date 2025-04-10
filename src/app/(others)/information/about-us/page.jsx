import React from "react";

export default function AboutUsPage() {
	return (
		<div className="min-h-screen md:w-[calc(100vw-300px)] m-2  p-8">
			<div className="container mx-auto max-w-4xl">
				<header className="mb-12 text-center">
					<h1 className="text-5xl font-bold mb-4">
						Austin Dachshund Rescue
					</h1>
					<p className="text-xl text-gray-700">
						Saving small heroes one paw at a time in the heart of Austin,
						Texas.
					</p>
				</header>

				<section className="mb-12">
					<h2 className="text-3xl font-semibold mb-4">Our Story</h2>
					<p className="text-lg mb-4">
						It all began on a warm summer evening in Austin, Texas, when a
						group of passionate dog lovers gathered at a local park. We
						noticed a few dachshunds in need of extra care—small, quirky,
						and filled with boundless love, yet left to fend for
						themselves.
					</p>
					<p className="text-lg mb-4">
						Inspired by the vibrant Austin spirit and its deep sense of
						community, we decided to create a rescue dedicated to saving
						these spirited dogs. From humble beginnings at a small,
						makeshift shelter tucked away in a quiet neighborhood, we
						quickly grew into a registered non-profit with a mission to
						provide every dachshund a chance for a better life.
					</p>
					<p className="text-lg">
						Today, our rescue is renowned for its compassionate care and
						innovative programs that connect every saved dachshund with a
						loving family. Our journey is fueled by the belief that every
						small pup deserves a big future.
					</p>
				</section>

				<section className="mb-12">
					<h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
					<p className="text-lg mb-4">
						At Austin Dachshund Rescue, our mission is clear: to save,
						nurture, and rehome dachshunds in need. We provide:
					</p>
					<ul className="list-disc pl-8 space-y-2 text-lg">
						<li>
							<strong>24/7 Care:</strong> Round-the-clock care and
							rehabilitation for every rescue.
						</li>
						<li>
							<strong>Community Outreach:</strong> Educational programs
							that inform the public about responsible pet ownership and
							the unique needs of dachshunds.
						</li>
						<li>
							<strong>Forever Homes:</strong> A diligent and
							compassionate adoption process that finds the perfect match
							for our rescued pups.
						</li>
					</ul>
				</section>

				<section className="mb-12">
					<h2 className="text-3xl font-semibold mb-4">Meet Our Team</h2>
					<p className="text-lg mb-4">
						Our team is a family of dedicated volunteers, veterinarians,
						and passionate dachshund enthusiasts who unite daily to make a
						difference. From caring for our pups at the shelter to
						organizing community events across Austin, our team’s effort
						transforms lives and strengthens our community.
					</p>
					<p className="text-lg">
						We believe that together, we can ensure that every dachshund
						has a loving home and a bright future.
					</p>
				</section>

				<footer className="text-center text-lg text-gray-600">
					© {new Date().getFullYear()} Austin Dachshund Rescue. All rights
					reserved.
				</footer>
			</div>
		</div>
	);
}
