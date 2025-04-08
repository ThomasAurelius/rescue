import Link from "next/link";
import React from "react";

const AdminPage = () => {
	return (
		<div className="flex flex-col gap-4 justify-center items-center w-[calc(100vw-300px)] p-4">
			<p className="text-3xl text-center">AdminPage</p>
			<div className="flex flex-col gap-4 w-full max-w-4xl p-4 bg-white shadow-md rounded-lg">
				<p>Links</p>
				<Link href="/admin/dogs/add">
					<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
						Add Dog
					</button>
				</Link>
				<Link href="/our-dogs/list">
					<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
						View List Dogs
					</button>
				</Link>
				<Link href="/admin/adoption/add">
					<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
						Add Adoption
					</button>
				</Link>
				<Link href="/admin/adoption/list">
					<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
						View List Adoptions
					</button>
				</Link>

				<Link href="/admin/application/list">
					<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
						View List Applications
					</button>
				</Link>
				<Link href="/admin/application/edit">
					<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
						Edit Application
					</button>
				</Link>
			</div>
		</div>
	);
};

export default AdminPage;
