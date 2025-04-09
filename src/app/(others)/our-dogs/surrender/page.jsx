import Link from "next/link";

export default function SurrenderDogPage() {
	return (
		<div className="w-[calc(100vw-300px)] flex justify-center text-center items-center mx-auto my-12 p-4">
			<div className=" flex flex-col justify-center items-center mx-auto max-w-3xl bg-white shadow-lg rounded-lg p-8">
				<h1 className="text-4xl font-bold text-center mb-6">
					Surrender Your Dog to Our Rescue
				</h1>
				<p className="mb-4 max-w-3xl text-lg">
					We understand that deciding to surrender your dog is a difficult
					and emotional process. Our rescue team is dedicated to helping
					both you and your pet throughout this challenging time.
				</p>
				<h2 className="text-2xl font-semibold mt-6 mb-3">
					Why Surrender to Our Rescue?
				</h2>
				<ul className="list-disc list-inside mb-4">
					<li>Compassionate care from experienced professionals</li>
					<li>A safe and nurturing environment for your pet</li>
					<li>
						Assistance with the transition to ensure your dog's well-being
					</li>
				</ul>
				<h2 className="text-2xl font-semibold mt-6 mb-3">
					The Surrender Process
				</h2>
				<p className="mb-4 text-lg">
					Our surrender process is designed to be as supportive as
					possible. It includes:
				</p>
				<ul className="list-disc list-inside mb-4">
					<li>A confidential consultation to discuss your concerns</li>
					<li>An evaluation of your dog's health and needs</li>
					<li>
						A guided application process to ensure all details are covered
					</li>
				</ul>
				<p className="mb-4 max-w-3xl text-lg">
					We are here to answer your questions and help you through every
					step, ensuring your dog gets the care and attention they deserve.
				</p>
				<div className="flex justify-center mt-8">
					<Link href="/our-dogs/surrender/application">
						<p className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded">
							Start Your Application
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
}
