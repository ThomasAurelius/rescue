import Link from "next/link";
import Image from "next/image";

const DonationsPage = () => {
	return (
		<div className="w-[calc(100vw-300px)] flex flex-col justify-center items-center mx-auto px-4 py-8">
			{/* Page Header */}
			<h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
				Support Our Foster Care
			</h1>
			<Link
				className="flex justify-center items-center"
				href="https://www.paypal.com/ncp/payment/9DXV53H8QEM4L"
			>
				<Image
					src="/assets/donate.PNG"
					alt="donations"
					width={500}
					height={300}
					className="rounded-lg mb-6 flex justify-center m-auto"
				/>
			</Link>
			{/* Introductory Text */}
			<p className="flex justify-center items-center text-lg w-3xl text-center text-gray-700 mb-6">
				Your generous donation helps cover the operational costs and daily
				care for dogs in foster homes. Every contribution makes a
				significant impact, ensuring these amazing animals receive the
				veterinary care, food, and shelter they need.
			</p>
			<p className="text-lg text-gray-700 mb-8">
				Thank you for considering a donation. Your support goes a long way
				in helping us provide a safe and loving environment for every foster
				dog.
			</p>

			<div className="flex items-center justify-center">
				<Link
					className="flex justify-center items-center"
					href="https://www.paypal.com/ncp/payment/9DXV53H8QEM4L"
				>
					<button
						type="submit"
						className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold text-3xl py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto"
					>
						Donate Now
					</button>
				</Link>
			</div>
			<div className="text-center bg-teal-50 rounded-lg text-xl text-gray-600 mt-4">
				If you are interested in making a recurring donation, please visit
				our{" "}
				<Link
					className="text-blue-600 underline"
					href="/support/sponsor-a-dachshund"
				>
					Sponsor a Dachshund
				</Link>{" "}
				page.
			</div>
		</div>
	);
};

export default DonationsPage;
