import Link from "next/link";
import { getRescueCollection } from "../../../lib/mongodb";

export default async function DogsListingPage() {
	let dogs = [];
	try {
		// getRescueCollection now returns the DB instance directly
		const db = await getRescueCollection();
		dogs = await db.collection("dogs").find({}).toArray();
	} catch (error) {
		console.error("Error fetching dogs:", error);
	}

	return (
		<div className="min-h-screen w-[calc(100vw-300px)] bg-gray-100 p-4">
			<div className="container mx-auto">
				<h1 className="text-3xl font-bold mb-6">Dogs Listing</h1>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border border-gray-200 rounded-lg">
						<thead className="bg-gray-200">
							<tr>
								<th className="py-3 px-4 text-left">Name</th>
								<th className="py-3 px-4 text-left">Breed</th>
								<th className="py-3 px-4 text-left">Age</th>
								<th className="py-3 px-4 text-left">Sex</th>
								<th className="py-3 px-4 text-left">Color</th>
								<th className="py-3 px-4 text-left">Intact</th>
								<th className="py-3 px-4 text-left">Adoption Fee</th>
								<th className="py-3 px-4 text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							{dogs.map((dog) => (
								<tr key={dog._id.toString()} className="border-b">
									<td className="py-3 px-4">{dog.name}</td>
									<td className="py-3 px-4">{dog.breed}</td>
									<td className="py-3 px-4">{dog.age}</td>
									<td className="py-3 px-4">{dog.sex}</td>
									<td className="py-3 px-4">{dog.color}</td>
									<td className="py-3 px-4">{dog.intact}</td>
									<td className="py-3 px-4">${dog.adoptionFee}</td>
									<td className="py-3 px-4">
										<Link
											href={`/our-dogs/view-page/${dog._id.toString()}`}
											className="text-blue-500 hover:underline"
										>
											View
										</Link>
									</td>
								</tr>
							))}
							{dogs.length === 0 && (
								<tr>
									<td
										colSpan="6"
										className="py-3 px-4 text-center text-gray-500"
									>
										No dogs found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
