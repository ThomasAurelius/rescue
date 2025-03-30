"use client";
import React, { useState } from "react";
import Link from "next/link";

const menuItems = [
	{
		label: "Home",
		href: "/",
		submenu: [
			{ label: "Store", href: "/store" },
			{ label: "Links & Resources", href: "/links-resources" },
			{ label: "Events", href: "/events" },
			{ label: "Shopping Partners", href: "/shopping-partners" },
		],
	},
	{
		label: "Support",
		href: "/support",
		submenu: [
			{ label: "Donations", href: "/support/donations" },
			{ label: "Adoption Info", href: "/suppor/adoption-info" },
			{
				label: "Fostering and Volunteer Info",
				href: "/support/fostering-volunteer",
			},

			{ label: "Sponsor a Dachshund", href: "/support/sponsor-a-dachshund" },
			{ label: "Pack Pals", href: "/support/pack-pals" },
			{ label: "Our Supporters", href: "/support/our-supporters" },
		],
	},
	{
		label: "Learn",
		href: "/learn",
		submenu: [
			{ label: "Description", href: "/learn/description" },
			{ label: "History", href: "/learn/history" },
			{ label: "Health", href: "/learn/health" },
			{
				label: "IVDD Resources",
				href: "/learn/ivdd-resources",
			},
			{ label: "FAQ?", href: "/learn/faq" },
		],
	},
	{
		label: "Our Dogs",
		href: "/our-dogs",
		submenu: [
			{ label: "Available dogs - List Style", href: "/our-dogs/list" },
			{
				label: "Available dogs - Page Browse Style",
				href: "/our-dogs/page",
			},
			{ label: "Recent Arrivals", href: "/our-dogs/recent-arrivals" },
			{ label: "Puppies", href: "/our-dogs/puppies" },
			{ label: "Adult Dogs", href: "/our-dogs/adult-dogs" },
			{ label: "Senior Sweethearts", href: "/our-dogs/senior-sweethearts" },
			{ label: "Special Needs Dogs", href: "/our-dogs/special-needs" },
			{
				label: "Successful Adoptions",
				href: "/our-dogs/successful-adoptions",
			},
			{ label: "Rainbow Bridge", href: "/our-dogs/rainbow-bridge" },
		],
	},
	{
		label: "Information",
		href: "/information",
		submenu: [
			{ label: "About Us", href: "/information/about-us" },
			{ label: "Contact Us", href: "/information/contact-us" },
			{ label: "Headline News", href: "/information/headline-news" },
			{ label: "Photo Gallery", href: "/information/photo-gallery" },
			{ label: "Happy Tails!", href: "/information/happy-tails" },
			{
				label: "Comanche County Puppymill Raid",
				href: "/information/puppymill-raid",
			},
		],
	},
	{ label: "Guestbook", href: "/guestbook" },
	{ label: "Login", href: "/login" },
	{ label: "Register", href: "/register" },
];

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [openSubmenus, setOpenSubmenus] = useState({});

	const toggleMenu = () => setMenuOpen(!menuOpen);
	const toggleSubmenu = (index) =>
		setOpenSubmenus((prev) => ({ ...prev, [index]: !prev[index] }));

	return (
		<nav className="bg-gray-800 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16 items-center">
					{/* Logo */}
					<div className="flex-shrink-0">
						<Link href="/">
							<p className="text-xl font-bold">Dachshund Rescue</p>
						</Link>
					</div>
					{/* Desktop Menu (visible on lg and above) */}
					<div className="hidden lg:flex space-x-4">
						{menuItems.map((item, index) => (
							<div key={index} className="relative group">
								{item.submenu ? (
									<>
										<button
											onClick={() => toggleSubmenu(index)}
											className="flex items-center focus:outline-none"
										>
											{item.label}
											<svg
												className="ml-1 h-4 w-4 fill-current"
												viewBox="0 0 20 20"
											>
												<path d="M5.5 7l4 4 4-4z" />
											</svg>
										</button>
										<div
											className={`absolute left-0 mt-2 w-48 bg-gray-700 rounded shadow-lg z-10 ${
												openSubmenus[index] ? "block" : "hidden"
											} group-hover:block`}
										>
											{item.submenu.map((subitem, subIndex) => (
												<Link key={subIndex} href={subitem.href}>
													<p className="block px-4 py-2 hover:bg-gray-600">
														{subitem.label}
													</p>
												</Link>
											))}
										</div>
									</>
								) : (
									<Link href={item.href}>
										<p className="hover:text-gray-300">
											{item.label}
										</p>
									</Link>
								)}
							</div>
						))}
					</div>
					{/* Mobile Menu Button (visible on screens smaller than lg) */}
					<div className="lg:hidden">
						<button
							onClick={toggleMenu}
							className="text-gray-300 hover:text-white focus:outline-none"
						>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								{menuOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								)}
							</svg>
						</button>
					</div>
				</div>
			</div>
			{/* Mobile Menu (visible on screens smaller than lg) */}
			<div className={`${menuOpen ? "block" : "hidden"} lg:hidden`}>
				<ul className="px-2 pt-2 pb-3 space-y-1">
					{menuItems.map((item, index) => (
						<li key={index}>
							{item.submenu ? (
								<>
									<button
										onClick={() => toggleSubmenu(index)}
										className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-700 focus:outline-none"
									>
										{item.label}
									</button>
									<ul
										className={`${
											openSubmenus[index] ? "block" : "hidden"
										} pl-4`}
									>
										{item.submenu.map((subitem, subIndex) => (
											<li key={subIndex}>
												<Link href={subitem.href}>
													<p className="block px-3 py-2 rounded-md hover:bg-gray-700">
														{subitem.label}
													</p>
												</Link>
											</li>
										))}
									</ul>
								</>
							) : (
								<Link href={item.href}>
									<p className="block px-3 py-2 rounded-md hover:bg-gray-700">
										{item.label}
									</p>
								</Link>
							)}
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
