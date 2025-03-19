import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { experimental__simple } from "@clerk/themes";
import Header from "@/components/header";
import { Toaster } from "sonner";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata = {
	title: "ZCRUM",
	description: "Jira Clone built with Next.js and Supabase",
	icons: "/Zlogo.png",
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: experimental__simple, // Change to light theme
				variables: {},
				elements: {},
			}}
		>
			<html lang="en">
				<head>
                    <title>{metadata.title}</title>
                    <meta name="description" content={metadata.description} />
                    <link rel="icon" href="/Zlogo.png" type="image/png" />
                </head>
                
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						disableTransitionOnChange
					>
						<Header />
						<main className="min-h-screen">{children}</main>
						<Toaster richColors />
						<footer className="bg-gray-100 py-12">
							<div className="container mx-auto px-4 text-center">
								<p className="text-gray-800">Made with &hearts; By MishraTanishq</p>
							</div>
						</footer>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}