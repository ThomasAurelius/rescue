import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import TopNav from "./components/TopNav";
import LeftBar from "./components/LeftBar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const playfair = Playfair_Display({
	variable: "--font-playfair",
	weight: ["400"],
	subsets: ["latin"],
});

const playfairBold = Playfair_Display({
	variable: "--font-playfair-bold",
	weight: ["700"],
	subsets: ["latin"],
});
export const font = [geistSans, geistMono, playfair, playfairBold];

export const metadata = {
	title: "Dachshund Rescue Group",
	description: "Example Dachshund Rescue Group",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
			>
				<TopNav />
				<div className="flex flex-row">
					<LeftBar />
					<div className="md:w-[calc(100vw-300px) mx-auto h-full">
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
