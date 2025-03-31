import React from "react";
import Image from "next/image";

const LeftBar = () => {
	return (
		<div className="flex flex-col max-[600px]:hidden w-[300px]  h-screen">
			<section className="flex flex-col  bg-blue-100 shadow-[7px_9px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-lg items-center justify-center">
				<h1 className="text-2xl font-bold ">Featured Dog</h1>
				<Image
					src="/assets/bernie1.jpg"
					alt="Dog"
					width="200"
					height="200"
					className=" rounded-lg mt-4"
				/>
				<p className="text-md mt-2">Name: Bernie</p>
				<p className="text-md">Age: 3 years</p>
				<p className="text-md">Breed: Dachshund</p>
				<p className="text-md">Location: Austin, TX</p>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 px-4 rounded mt-4">
					Adopt Me!
				</button>
			</section>
			<section className="flex flex-col  bg-blue-100 shadow-[7px_9px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-lg items-center justify-center mt-4">
				<h1 className="text-xl py-2 text-center font-bold ">
					Make a difference in a dogs life!
				</h1>
				<p className="text-2xl mt-2">Donate today!</p>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 mt-4">
					Donate
				</button>
			</section>
			<section className="flex flex-col  bg-blue-100 shadow-[7px_9px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-lg items-center justify-center mt-4">
				<h1 className="text-xl py-2 text-center font-bold ">
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
							height="400"
						/>
					</a>
				</div>
			</section>
			<section className="flex flex-col  bg-blue-100 shadow-[7px_9px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-lg items-center justify-center mt-4">
				<h1 className="text-xl py-2 text-center font-bold ">
					Sign up for our Newsletter!
				</h1>
				<input
					type="email"
					placeholder="Enter your email"
					className="border-2 border-gray-300 bg-white rounded-lg p-2 mb-2"
				/>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 mt-4">
					Subscribe
				</button>
			</section>
			<section className="flex flex-col  bg-blue-100 shadow-[7px_9px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-lg items-center justify-center mt-4">
				<h1 className="text-xl p-2 text-center font-bold ">
					Shop our partners and support us!
				</h1>

				<Image
					src="/assets/facebookbadge.gif"
					alt="Shop"
					width="200"
					height="200"
					className=" rounded-lg mt-4 my-2"
				/>
				<Image
					src="/assets/amazon.gif"
					alt="Shop"
					width="200"
					height="200"
					className=" rounded-lg mt-4 my-2"
				/>
			</section>
		</div>
	);
};

export default LeftBar;
