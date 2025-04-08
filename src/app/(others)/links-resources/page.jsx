import React from "react";

const page = () => {
	return (
		<div>
			<div className="w-[calc(100vw-300px)] flex flex-col justify-center items-center mx-auto p-8">
				<h1 className="text-5xl font-bold mb-8 text-center">
					Dachshund Rescue Resources
				</h1>

				{/* Dachshund Rescue Organizations */}
				<section className="mb-12  ">
					<h2 className="text-3xl text-center font-bold mb-4">
						Dachshund Rescue Organizations
					</h2>
					<ul className="list-disc pl-8 space-y-2 text-lg">
						<li>
							<a
								href="https://www.dachshundrescue.org"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline text-lg"
							>
								Dachshund Rescue Network
							</a>{" "}
							– A national network connecting potential adopters with
							rescue organizations.
						</li>
						<li>
							<a
								href="https://www.dachshundrescue-socal.org"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline text-lg"
							>
								Dachshund Rescue Southern California
							</a>{" "}
							– Dedicated to rescuing and rehoming dachshunds in Southern
							California.
						</li>
						<li>
							<a
								href="https://www.nationaldachshundrescue.org"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline text-lg"
							>
								National Dachshund Rescue & Research
							</a>{" "}
							– Focuses on both rescuing dachshunds and researching their
							health needs.
						</li>
					</ul>
				</section>

				{/* IVDD Resources */}
				<section className="mb-12">
					<h2 className="text-3xl text-center font-bold mb-4">
						IVDD Resources
					</h2>
					<ul className="list-disc pl-8 space-y-2 text-lg">
						<li>
							<a
								href="https://www.ivdd.org"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline text-lg"
							>
								IVDD Research Foundation
							</a>{" "}
							– Offers information on Intervertebral Disc Disease (IVDD)
							in dogs.
						</li>
						<li>
							<a
								href="https://www.akc.org/expert-advice/health/intervertebral-disc-disease-in-dogs/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline text-lg"
							>
								AKC IVDD Information
							</a>{" "}
							– In-depth article about IVDD from the American Kennel
							Club.
						</li>
						<li>
							<a
								href="https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/research/ivdd"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline text-lg"
							>
								Cornell IVDD Research
							</a>{" "}
							– Research and studies on IVDD from Cornell University.
						</li>
					</ul>
				</section>

				{/* Local Pet Stores & Veterinary Services */}
				<section className="mb-12">
					<h2 className="text-3xl text-center font-bold mb-4">
						Local Pet Stores & Veterinary Services
					</h2>
					<ul className="list-disc pl-8 space-y-2 text-lg">
						<li>
							<a
								href="https://www.petco.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline text-lg"
							>
								Petco
							</a>{" "}
							– A nationwide pet supply chain with a variety of pet
							products.
						</li>
						<li>
							<a
								href="https://www.petsmart.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline text-lg"
							>
								PetSmart
							</a>{" "}
							– Offers pet supplies, services, and adoption events.
						</li>

						<li>
							<a
								href="https://www.vca.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline text-lg"
							>
								VCA Animal Hospitals
							</a>{" "}
							– Provides comprehensive veterinary care across the U.S.
						</li>
					</ul>
				</section>

				{/* Additional Resources */}
				<section className="mb-12">
					<h2 className="text-3xl text-center font-bold mb-4">
						Additional Resources
					</h2>
					<ul className="list-disc pl-8 space-y-2 text-lg">
						<li>
							<a
								href="https://www.dachshundclubofamerica.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline text-lg"
							>
								Dachshund Club of America
							</a>{" "}
							– Offers breed information, events, and community
							resources.
						</li>
						<li>
							<a
								href="https://www.aspca.org/pet-adoption"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline text-lg"
							>
								ASPCA Adoption Resources
							</a>{" "}
							– Provides pet adoption information and resources.
						</li>
					</ul>
				</section>

				<footer className="text-center text-gray-500 text-base">
					© {new Date().getFullYear()} Dachshund Rescue Application. All
					rights reserved.
				</footer>
			</div>
		</div>
	);
};

export default page;
