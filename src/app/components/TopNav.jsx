"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menuItems = [
	{
		label: "Home",
		href: "/",
		submenu: [
			{ label: "Home Page", href: "/" },
			{ label: "Links & Resources", href: "/links-resources" },
		],
	},
	{
		label: "Support",
		href: "/support",
		submenu: [
			{ label: "Donations", href: "/support/donations" },
			{ label: "Adoption Info", href: "/support/adoption-info" },
			{
				label: "Fostering and Volunteer Info",
				href: "/support/fostering-volunteer",
			},
			{ label: "Sponsor a Dachshund", href: "/support/sponsor-a-dachshund" },
			{ label: "Our Supporters", href: "/support/our-supporters" },
		],
	},
	{
		label: "Learn",
		href: "/learn",
		submenu: [
			{ label: "Description", href: "/learn/description" },
			{ label: "Adoption Process", href: "/learn/adoption-process" },
			{ label: "IVDD Resources", href: "/learn/ivdd" },
			{ label: "FAQ", href: "/learn/faq" },
		],
	},
	{
		label: "Our Dogs",
		href: "/our-dogs",
		submenu: [
			{ label: "Available dogs", href: "/our-dogs/list" },
			{
				label: "Successful Adoptions",
				href: "/our-dogs/successful-adoptions",
			},
			{ label: "Surrending A Dog", href: "/our-dogs/surrender" },
		],
	},
	{
		label: "Information",
		href: "/information",
		submenu: [
			{ label: "About Us", href: "/information/about-us" },
			{ label: "Contact Us", href: "/information/contact-us" },
			{ label: "Photo Gallery", href: "/information/photo-gallery" },
		],
	},
];

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [openSubmenus, setOpenSubmenus] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const userMenuRef = useRef(null);
	const router = useRouter();

	useEffect(() => {
		async function fetchProfile() {
			try {
				const res = await fetch("/api/profile", {
					credentials: "include",
				});
				if (res.ok) {
					const data = await res.json();
					if (data.user) {
						setIsLoggedIn(true);
						setUser(data.user);
					} else {
						setIsLoggedIn(false);
						setUser(null);
					}
				} else {
					setIsLoggedIn(false);
					setUser(null);
				}
			} catch (error) {
				console.error("Error fetching profile:", error);
				setIsLoggedIn(false);
				setUser(null);
			}
		}
		fetchProfile();
	}, []);

	const toggleMenu = () => setMenuOpen(!menuOpen);
	const toggleSubmenu = (index) =>
		setOpenSubmenus((prev) => ({ ...prev, [index]: !prev[index] }));
	const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

	const handleLogout = async () => {
		try {
			const res = await fetch("/api/auth/logout", {
				method: "POST",
				credentials: "include",
			});
			if (res.ok) {
				setIsLoggedIn(false);
				setUser(null);
				window.location.href = "/";
			}
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<nav className="bg-gray-800 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16 items-center">
					<div className="flex-shrink-0">
						<Link href="/" className="text-xl font-bold">
							Dachshund Rescue
						</Link>
					</div>
					<div className="hidden lg:flex space-x-4 items-center">
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
											}`}
										>
											{item.submenu.map((subitem, subIndex) => (
												<Link
													key={subIndex}
													href={subitem.href}
													className="block px-4 py-2 hover:bg-gray-600"
												>
													{subitem.label}
												</Link>
											))}
										</div>
									</>
								) : (
									<Link
										href={item.href}
										className="hover:text-gray-300"
									>
										{item.label}
									</Link>
								)}
							</div>
						))}
						{!isLoggedIn ? (
							<>
								<Link href="/login" className="hover:text-gray-300">
									Login
								</Link>
								<Link href="/register" className="hover:text-gray-300">
									Register
								</Link>
							</>
						) : (
							<div className="relative" ref={userMenuRef}>
								<button
									onClick={toggleUserMenu}
									className="flex items-center focus:outline-none"
								>
									<svg
										className="h-6 w-6 text-white"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
									</svg>
								</button>
								<div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded shadow-lg z-20 block">
									{user?.role === "admin" && (
										<button
											onClick={() => router.push("/admin")}
											className="block w-full text-left px-4 py-2 hover:bg-gray-600"
										>
											Admin
										</button>
									)}
									<button
										onClick={() => router.push("/profile")}
										className="block w-full text-left px-4 py-2 hover:bg-gray-600"
									>
										Profile
									</button>
									<button
										onClick={() => router.push("/settings")}
										className="block w-full text-left px-4 py-2 hover:bg-gray-600"
									>
										Settings
									</button>
									<button
										onClick={handleLogout}
										className="block w-full text-left px-4 py-2 hover:bg-gray-600"
									>
										Logout
									</button>
								</div>
							</div>
						)}
					</div>
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
			{/* Mobile Full Menu */}
			{menuOpen && (
				<div className="lg:hidden px-4 pb-4">
					<div className="space-y-2">
						{menuItems.map((item, index) => (
							<div key={index}>
								<button
									onClick={() => toggleSubmenu(index)}
									className="w-full flex justify-between items-center text-left font-semibold mt-2 px-2 py-1 rounded bg-gray-800 hover:bg-gray-700"
								>
									{item.label}
									<span className="ml-2 text-sm">
										{openSubmenus[index] ? "▲" : "▼"}
									</span>
								</button>

								{/* Submenu */}
								{item.submenu && (
									<div
										className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${
											openSubmenus[index]
												? "max-h-96 opacity-100 mt-1"
												: "max-h-0 opacity-0"
										}`}
									>
										{item.submenu.map((subitem, subIndex) => (
											<Link
												key={subIndex}
												href={subitem.href}
												className="block px-2 py-1 rounded hover:bg-gray-700"
											>
												{subitem.label}
											</Link>
										))}
									</div>
								)}
							</div>
						))}

						{/* User Actions */}
						{!isLoggedIn ? (
							<>
								<Link
									href="/login"
									className="block px-2 py-1 rounded hover:bg-gray-700"
								>
									Login
								</Link>
								<Link
									href="/register"
									className="block px-2 py-1 rounded hover:bg-gray-700"
								>
									Register
								</Link>
							</>
						) : (
							<>
								{user?.role === "admin" && (
									<button
										onClick={() => router.push("/admin")}
										className="block w-full text-left px-4 py-2  rounded hover:bg-gray-600"
									>
										Admin
									</button>
								)}
								{/*<button
									onClick={() => router.push("/profile")}
									className="block w-full text-left px-4 py-2rounded hover:bg-gray-600"
								>
									Profile
								</button> 
								<button
									onClick={() => router.push("/settings")}
									className="block w-full text-left px-4 py-2 rounded hover:bg-gray-600"
								>
									Settings
								</button> */}
								<button
									onClick={handleLogout}
									className="block w-full text-left px-4 py-2 rounded hover:bg-gray-600"
								>
									Logout
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
