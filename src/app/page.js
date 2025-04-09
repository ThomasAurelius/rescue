import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-full w-[calc(100vw-300px)]">
			<h1 className="p-4 text-3xl font-bold underline">
				Dachshund Rescue Group
			</h1>
			<div className="flex flex-wrap justify-center gap-4 m-auto p-4">
				<Link href="/support/adoption-info">
					<Image
						src="https://firebasestorage.googleapis.com/v0/b/rescue-94ae4.firebasestorage.app/o/uploads%2FAdopt.PNG?alt=media&token=4bdf4462-0aa3-4a2f-837e-783a03637103"
						alt="Dog"
						width="250"
						height="250"
						className="rounded-lg"
					/>
				</Link>
				<Link href="/support/fostering-volunteer">
					<Image
						src="https://firebasestorage.googleapis.com/v0/b/rescue-94ae4.firebasestorage.app/o/uploads%2FVolunteer.png?alt=media&token=c2217500-94d8-45ef-8c3d-cdb0f8ca984c"
						alt="Dog"
						width="250"
						height="250"
						className="rounded-lg"
					/>
				</Link>
				<Link href="/support/donations">
					<Image
						src="https://firebasestorage.googleapis.com/v0/b/rescue-94ae4.firebasestorage.app/o/uploads%2Fdonate.PNG?alt=media&token=a23d5358-ee65-4208-bdec-590386040f88"
						alt="Dog"
						width="250"
						height="250"
						className="rounded-lg"
					/>
				</Link>
			</div>
			<p className="text-center max-w-3xl text-lg p-4">
				Welcome to the Dachshund Rescue Group! We are a non-profit
				organization dedicated to rescuing and rehoming dachshunds in need.
				To do that, we need your help! We need volunteers, foster families
				and donations.
			</p>
			<section className="flex  flex-wrap p-4 gap-8 justify-center">
				<div className="flex flex-col items-center justify-between border-1 border-gray-300 shadow-[7px_9px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-lg p-4 w-[300px]">
					<h1 className="text-2xl font-bold">Available Dogs</h1>
					<Image
						src="/assets/bernie1.jpg"
						alt="Dog"
						width="200"
						height="200"
						className="rounded-lg mt-4"
					/>
					<p>
						We have dachshunds of all ages, from puppies to seniors. We
						will work with you to find the right dog for your family!
					</p>
					<Link href="/our-dogs/list">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 px-4 rounded mt-4">
							See Available Dogs
						</button>
					</Link>
				</div>
				<div className="flex flex-col items-center justify-between border-1 border-gray-300 shadow-[7px_9px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-lg p-4 w-[300px]">
					<h1 className="text-2xl font-bold">Adoption Application</h1>
					<Image
						src="/assets/application.jpg"
						alt="Dog"
						width="200"
						height="200"
						className="rounded-lg mt-4"
					/>
					<p>
						Fill out the adoption application to get started on the
						adoption process.
					</p>
					<Link href="/support/adoption-info">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 px-4 rounded mt-4">
							Application
						</button>
					</Link>
				</div>
				<div className="flex flex-col items-center justify-between border-1 border-gray-300 shadow-[7px_9px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-lg p-4 w-[300px]">
					<h1 className="text-2xl font-bold">Sponsor a Dog</h1>
					<Image
						src="/assets/jackson.jpeg"
						alt="Dog"
						width="200"
						height="200"
						className="rounded-lg mt-4"
					/>
					<p>
						Make a world of difference in the life of a dog in need by
						sponsoring their care.
					</p>
					<Link href="/support/sponsor-a-dachshund">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 px-4 rounded mt-4">
							Sponsor a dog
						</button>
					</Link>
				</div>
			</section>
		</div>
	);
}
