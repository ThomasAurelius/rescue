"use client";
import React, { useState } from "react";
import Image from "next/image";

const PhotoGalleryPage = () => {
	// Placeholder image URLs – replace with your actual image sources.
	const placeholderImages = [
		"/assets/bernie1.jpg",
		"/assets/jackson.jpeg",
		"/assets/milo.jpg",
		"/assets/sam.jpg",
		"/assets/dox1.jpg",
		"/assets/dox2.jpg",
		"/assets/dox3.jpg",
		"/assets/bernie1.jpg",
		"/assets/jackson.jpeg",
		"/assets/milo.jpg",
		"/assets/sam.jpg",
		"/assets/dox1.jpg",
		"/assets/dox2.jpg",
		"/assets/dox3.jpg",
		"/assets/bernie1.jpg",
		"/assets/jackson.jpeg",
		"/assets/milo.jpg",
		"/assets/sam.jpg",
		"/assets/dox1.jpg",
		"/assets/dox2.jpg",
		"/assets/dox3.jpg",
	];

	// State to store the selected image for the modal view.
	const [selectedImage, setSelectedImage] = useState(null);

	return (
		<div className="min-h-screen  p-8">
			<h1 className="text-5xl font-bold text-center mb-8">Photo Gallery</h1>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{placeholderImages.map((src, index) => (
					<div
						key={index}
						className="cursor-pointer"
						onClick={() => setSelectedImage(src)}
					>
						<Image
							src={src}
							alt={`Photo ${index + 1}`}
							width={400}
							height={300}
							className="rounded hover:opacity-75 transition-opacity"
						/>
					</div>
				))}
			</div>

			{/* Modal overlay */}
			{selectedImage && (
				<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
					<div className="relative">
						<Image
							src={selectedImage}
							alt="Enlarged view"
							width={800}
							height={600}
							className="rounded"
						/>
						<button
							onClick={() => setSelectedImage(null)}
							className="absolute top-0 right-0 m-4 text-white text-4xl font-bold hover:text-gray-300"
						>
							&times;
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default PhotoGalleryPage;
