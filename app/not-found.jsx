import Link from "next/link";
import { FrownIcon, HomeIcon } from "lucide-react";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
			<div className="text-center">
				<FrownIcon className="w-20 h-20 mx-auto text-gray-500 dark:text-gray-400 mb-4" />
				<h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
					404
				</h1>
				<h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
					Page Not Found
				</h2>
				<p className="text-gray-600 dark:text-gray-400 mb-8">
					Oops! The page you&apos;re looking for doesn&apos;t exist.
				</p>
				<Link
					href="/"
					className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					<HomeIcon className="w-4 h-4 mr-2" />
					Go back home
				</Link>
			</div>
		</div>
	);
}
