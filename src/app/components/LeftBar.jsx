import React from "react";
import Image from "next/image";

const LeftBar = () => {
	return (
		<div className="flex flex-col w-[300px]  bg-blue-300 h-screen">
			<section className="flex flex-col border-2 items-center justify-center">
				<h1 className="text-2xl font-bold ">Featured Dog</h1>
				<Image
					src="/assets/bernie1.jpg"
					alt="Dog"
					width="200"
					height="200"
					className=" rounded-lg mt-4"
				/>
				<p className="text-lg mt-2">Name: Bernie</p>
				<p className="text-lg">Age: 3 years</p>
				<p className="text-lg">Breed: Dachshund</p>
				<p className="text-lg">Location: Austin, TX</p>
			</section>
		</div>
	);
};

export default LeftBar;
