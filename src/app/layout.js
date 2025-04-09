import { Geist, Geist_Mono } from "next/font/google";
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
					<div className="w-[calc(100vw-300px) h-full">{children}</div>
				</div>
			</body>
		</html>
	);
}
