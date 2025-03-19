import CompanyCarousel from "@/components/CompanyCarousel";
// import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart, Calendar, Layout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import faqs from "@/data/faqs.json";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const Page = () => {
	const features = [
		{
			title: "Intuitive Kanban Boards",
			description:
				"Visualize your workflow and optimize team productivity with our easy-to-use Kanban boards.",
			icon: Layout,
		},
		{
			title: "Powerful Sprint Planning",
			description:
				"Plan and manage sprints effectively, ensuring your team stays focused on delivering value.",
			icon: Calendar,
		},
		{
			title: "Comprehensive Reporting",
			description:
				"Gain insights into your team's performance with detailed, customizable reports and analytics.",
			icon: BarChart,
		},
	];

	return (
		<div>
			{/* Hero Section */}
			<section className="container mx-auto py-24 text-center relative overflow-hidden">
				<div className="absolute inset-0 -z-10 wave-background"></div>
				<div className="relative z-10">
					<h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold pb-8 flex flex-col light-gradient-title">
						Streamline your workflow <br />
						<span className="flex mx-auto gap-3 sm:gap-4 items-center">
							with{" "}
							<Image
								src={"/logo2.png"}
								alt="Zscrum Logo"
								width={400}
								height={80}
								className="h-14 sm:h-24 w-auto object-contain"
							/>
						</span>
					</h1>
					<p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
						Empower your team with our intuitive project management
						solution.
						<span className="block mt-2 text-blue-600">
							Ship faster. Collaborate better. Achieve more.
						</span>
					</p>
					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<Link href="/onboarding">
							<Button
								size="lg"
								className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transition-all duration-300 shadow-lg shadow-blue-300/20"
							>
								Get Started
							</Button>
						</Link>
						<Link href="/#features">
							<Button
								size="lg"
								variant="outline"
								className="border-blue-500 text-blue-600 hover:bg-blue-50 transition-all duration-300"
							>
								Learn More
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section
				id="features"
				className="bg-gradient-to-b from-gray-100 to-white py-24 px-5"
			>
				<div className="container mx-auto">
					<h3 className="text-4xl font-bold mb-4 text-center light-gradient-title">
						Key Features
					</h3>
					<p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
						Everything you need to manage your projects efficiently
						in one place
					</p>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{features.map((feat, index) => {
							return (
								<Card
									key={index}
									className="bg-white backdrop-blur border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100 group"
								>
									<CardContent className="pt-8 pb-6 px-6">
										<div className="bg-blue-50 p-4 rounded-lg inline-flex mb-6 group-hover:bg-blue-100 transition-all duration-300">
											<feat.icon className="h-10 w-10 text-blue-600 group-hover:text-blue-700" />
										</div>
										<h4 className="text-2xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-all duration-300">
											{feat.title}
										</h4>
										<p className="text-gray-600">
											{feat.description}
										</p>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			{/* Carousel */}
			<section className="bg-blue-50 py-20 px-5">
				<div className="container mx-auto">
					<h3 className="text-3xl font-bold mb-12 text-center text-gray-800">
						Trusted by Industry Leaders
					</h3>
					<CompanyCarousel />
				</div>
			</section>

			{/* FAQs Section */}
			<section className="bg-white py-24 px-5">
				<div className="container mx-auto max-w-4xl">
					<h3 className="text-4xl font-bold mb-4 text-center light-gradient-title">
						Frequently Asked Questions
					</h3>
					<p className="text-lg text-gray-600 mb-12 text-center">
						Got questions? We&apos;ve got answers.
					</p>
					<Accordion type="single" collapsible className="w-full">
						{faqs.map((i, k) => {
							return (
								<AccordionItem
									key={k}
									value={`item-${k + 1}`}
									className="border-gray-200 hover:border-blue-300 transition-all duration-300"
								>
									<AccordionTrigger className="text-lg font-medium py-4 text-gray-700 hover:text-blue-600 transition-all duration-300">
										{i.question}
									</AccordionTrigger>
									<AccordionContent className="text-gray-600 pb-4">
										{i.answer}
									</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-gradient-to-b from-blue-50 to-blue-100 text-center py-24 px-5 relative overflow-hidden">
				<div className="absolute inset-0 -z-10 overlay-pattern"></div>
				<div className="container mx-auto relative z-10">
					<h3 className="text-4xl font-bold mb-6 text-gray-800">
						Ready to Transform Your Workflow?
					</h3>
					<p className="text-xl mb-12 text-gray-600 max-w-2xl mx-auto">
						Join thousands of teams already using{" "}
						<span className="text-blue-600 font-semibold">
							ZCRUM
						</span>{" "}
						to streamline their projects and boost productivity.
					</p>
					<Link href="/onboarding">
						<Button
							size="lg"
							className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transition-all duration-300 shadow-lg shadow-blue-300/20 px-8 py-6 text-lg"
						>
							Start for Free{" "}
							<ArrowRight className="ml-2 h-5 w-5" />
						</Button>
					</Link>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="bg-gray-50 py-24 px-5">
				<div className="container mx-auto">
					<h3 className="text-4xl font-bold mb-4 text-center light-gradient-title">
						What Our Users Say
					</h3>
					<p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
						Don&apos;t just take our word for it - see what our customers
						have to say
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								name: "Sarah Johnson",
								role: "Product Manager at TechCorp",
								quote: "ZCRUM has transformed how our team collaborates. The kanban boards are intuitive and the sprint planning features are exactly what we needed.",
								avatar: "/api/placeholder/100/100", // You'll need to add placeholder images
							},
							{
								name: "Michael Chen",
								role: "Engineering Lead at DevStack",
								quote: "The reporting features in ZCRUM give us insights we never had before. We've improved our sprint velocity by 30% since adopting it.",
								avatar: "/api/placeholder/100/100",
							},
							{
								name: "Emily Rodriguez",
								role: "Scrum Master at InnoSoft",
								quote: "As a Scrum Master, ZCRUM has made my job so much easier. The team loves it, and our stakeholders appreciate the transparency.",
								avatar: "/api/placeholder/100/100",
							},
						].map((testimonial, index) => (
							<Card
								key={index}
								className="bg-white border border-gray-200 p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
							>
								<div className="flex items-center mb-4">
									<div className="w-12 h-12 rounded-full bg-blue-100 mr-4 flex items-center justify-center text-xl font-bold text-blue-600">
										{testimonial.name.charAt(0)}
									</div>
									<div>
										<h4 className="font-semibold text-gray-800">
											{testimonial.name}
										</h4>
										<p className="text-gray-500 text-sm">
											{testimonial.role}
										</p>
									</div>
								</div>
								<p className="text-gray-600 italic">
									{testimonial.quote}
								</p>
								<div className="mt-4 flex text-blue-400">
									{[...Array(5)].map((_, i) => (
										<svg
											key={i}
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>
									))}
								</div>
							</Card>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Page;
