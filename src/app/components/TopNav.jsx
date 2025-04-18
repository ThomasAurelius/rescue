"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menuItems = [
	{ label: "Home", href: "/" },
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
			{ label: "Surrender A Dog", href: "/our-dogs/surrender" },
		],
	},
	{
		label: "Information",
		href: "/information",
		submenu: [
			{ label: "About Us", href: "/information/about-us" },
			{ label: "Contact Us", href: "/information/contact-us" },
			{ label: "Photo Gallery", href: "/information/photo-gallery" },
			{ label: "Links & Resources", href: "/links-resources" },
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
				const res = await fetch("/api/profile", { credentials: "include" });
				if (res.ok) {
					const data = await res.json();
					if (data.user) {
						setIsLoggedIn(true);
						setUser(data.user);
					}
				}
			} catch (err) {
				console.error(err);
			}
		}
		fetchProfile();
	}, []);

	const toggleMenu = () => setMenuOpen(!menuOpen);
	const toggleSubmenu = (idx) =>
		setOpenSubmenus((prev) => ({ ...prev, [idx]: !prev[idx] }));
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
				router.push("/");
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<nav className="bg-gray-800 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16 items-center">
					<Link
						href="/"
						onClick={() => setOpenSubmenus({})}
						className="text-xl font-bold"
					>
						<img
							src="/assets/logo.png"
							alt="Logo"
							className="h-10 w-30 rounded-full"
						/>
					</Link>

					{/* Desktop Menu */}
					<div className="hidden lg:flex space-x-4 items-center">
						{menuItems.map((item, i) =>
							item.submenu ? (
								<div key={i} className="relative">
									<button
										onClick={() => toggleSubmenu(i)}
										className="flex items-center hover:text-gray-300 focus:outline-none"
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
											openSubmenus[i] ? "block" : "hidden"
										}`}
									>
										{item.submenu.map((sub, j) => (
											<Link
												key={j}
												href={sub.href}
												onClick={() => setOpenSubmenus({})}
												className="block px-4 py-2 hover:bg-gray-600"
											>
												{sub.label}
											</Link>
										))}
									</div>
								</div>
							) : (
								<Link
									key={i}
									href={item.href}
									onClick={() => setOpenSubmenus({})}
									className="hover:text-gray-300"
								>
									{item.label}
								</Link>
							)
						)}

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
								{userMenuOpen && (
									<div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded shadow-lg z-20">
										{user?.role === "admin" && (
											<button
												onClick={() => {
													router.push("/admin");
													setUserMenuOpen(false);
												}}
												className="block w-full text-left px-4 py-2 hover:bg-gray-600"
											>
												Admin
											</button>
										)}
										<button
											onClick={() => {
												router.push("/profile");
												setUserMenuOpen(false);
											}}
											className="block w-full text-left px-4 py-2 hover:bg-gray-600"
										>
											Profile
										</button>
										<button
											onClick={() => {
												router.push("/settings");
												setUserMenuOpen(false);
											}}
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
								)}
							</div>
						)}
					</div>

					{/* Mobile toggle button */}
					<div className="lg:hidden">
						<button
							onClick={toggleMenu}
							className="text-gray-300 hover:text-white focus:outline-none"
						>
							{menuOpen ? (
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Full Menu */}
			{menuOpen && (
				<div className="lg:hidden px-4 pb-4">
					<div className="space-y-2">
						{menuItems.map((item, i) => (
							<div key={i}>
								{item.submenu ? (
									<>
										<button
											onClick={() => toggleSubmenu(i)}
											className="w-full flex justify-between items-center text-left font-semibold px-2 py-1 rounded bg-gray-800 hover:bg-gray-700"
										>
											{item.label}
											<span className="ml-2 text-sm">
												{openSubmenus[i] ? "▲" : "▼"}
											</span>
										</button>
										<div
											className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${
												openSubmenus[i]
													? "max-h-96 opacity-100 mt-1"
													: "max-h-0 opacity-0"
											}`}
										>
											{item.submenu.map((sub, j) => (
												<Link
													key={j}
													href={sub.href}
													onClick={() => {
														setOpenSubmenus({});
														setMenuOpen(false);
													}}
													className="block px-2 py-1 rounded hover:bg-gray-700"
												>
													{sub.label}
												</Link>
											))}
										</div>
									</>
								) : (
									<Link
										href={item.href}
										onClick={() => {
											setOpenSubmenus({});
											setMenuOpen(false);
										}}
										className="block font-semibold px-2 py-1 rounded bg-gray-800 hover:bg-gray-700"
									>
										{item.label}
									</Link>
								)}
							</div>
						))}

						{/* User Actions */}
						{!isLoggedIn ? (
							<>
								<Link
									href="/login"
									onClick={() => {
										setOpenSubmenus({});
										setMenuOpen(false);
									}}
									className="block px-2 py-1 rounded hover:bg-gray-700"
								>
									Login
								</Link>
								<Link
									href="/register"
									onClick={() => {
										setOpenSubmenus({});
										setMenuOpen(false);
									}}
									className="block px-2 py-1 rounded hover:bg-gray-700"
								>
									Register
								</Link>
							</>
						) : (
							<>
								{user?.role === "admin" && (
									<button
										onClick={() => {
											router.push("/admin");
											setMenuOpen(false);
										}}
										className="block w-full text-left px-2 py-1 rounded hover:bg-gray-700"
									>
										Admin
									</button>
								)}
								<button
									onClick={() => {
										router.push("/profile");
										setMenuOpen(false);
									}}
									className="block w-full text-left px-2 py-1 rounded hover:bg-gray-700"
								>
									Profile
								</button>
								<button
									onClick={() => {
										router.push("/settings");
										setMenuOpen(false);
									}}
									className="block w-full text-left px-2 py-1 rounded hover:bg-gray-700"
								>
									Settings
								</button>
								<button
									onClick={handleLogout}
									className="block w-full text-left px-2 py-1 rounded hover:bg-gray-700"
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
