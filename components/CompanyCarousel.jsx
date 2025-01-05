"use client";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import companies from "@/data/companies";
import Autoplay from "embla-carousel-autoplay";

const CompanyCarousel = () => {
	return (
		<Carousel
			opts={{
				align: "start",
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 2000,
				}),
			]}
			className="w-full py-10"
		>
			<CarouselContent className="flex gsp-5 sm:gap-20 items-center">
				{companies.map(({ name, path, id }) => {
					return (
						<CarouselItem
							key={id}
							className="basis-1/3 lg:basis-1/6"
						>
							<Image
								src={path}
								alt={name}
								height={56}
								width={200}
								className="h-9 sm:h-14 w-auto object-contain"
							/>
						</CarouselItem>
					);
				})}
			</CarouselContent>
		</Carousel>
	);
};

export default CompanyCarousel;
