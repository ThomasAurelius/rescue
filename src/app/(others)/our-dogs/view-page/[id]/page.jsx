// app/dogs/[id]/page.jsx
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";

export default async function DogViewPage({ params }) {
	const { id } = params;
	let dog = null;

	try {
		const client = await clientPromise;
		const db = client.db();
		dog = await db.collection("dogs").findOne({ _id: new ObjectId(id) });
	} catch (error) {
		console.error("Error fetching dog data:", error);
	}

	if (!dog) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<p className="text-xl text-gray-600">Dog not found.</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen w-[calc(100vw-300px)] bg-gray-100 flex items-start justify-center p-4">
			<div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
				<Link href="/our-dogs/list">
					<button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
						Back to List
					</button>
				</Link>
				<Image
					src="/assets/bernie1.jpg"
					width={500}
					height={300}
					alt="Dog Image"
					className="w-full h-auto rounded-lg mb-4"
				/>
				<h1 className="text-3xl font-bold mb-4">{dog.name}</h1>
				<div className="space-y-2">
					<p className="text-gray-700">
						<span className="font-semibold">Breed:</span> {dog.breed}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Age:</span> {dog.age}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Color:</span> {dog.color}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Description:</span>{" "}
						{dog.description}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Sex:</span> {dog.sex}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Weight:</span> {dog.weight}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Activity Level:</span>{" "}
						{dog.activityLevel}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Indoor/Outdoor:</span>{" "}
						{dog.indoorOutdoor}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Good With Kids:</span>{" "}
						{dog.goodWithKids}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Good With Pets:</span>{" "}
						{dog.goodWithPets}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Health Status:</span>{" "}
						{dog.healthStatus}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Training Level:</span>{" "}
						{dog.trainingLevel}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Special Needs:</span>{" "}
						{dog.specialNeeds}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Adoption Fee:</span> $
						{dog.adoptionFee}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Size:</span> {dog.size}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Companions:</span>{" "}
						{Array.isArray(dog.companions)
							? dog.companions.join(", ")
							: dog.companions}
					</p>
				</div>
			</div>
		</div>
	);
}
