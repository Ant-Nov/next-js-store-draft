import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import hero1 from '@/public/hero1.jpg';
import hero2 from '@/public/hero2.jpg';
import hero3 from '@/public/hero3.jpg';
import hero4 from '@/public/hero4.jpg';

const images = [
  hero1,
  hero2,
  hero3,
  hero4
];

const HeroCarousel = () => {
  return (
    <div className="px-12">
      <Carousel className="">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-2">
                    <Image
                      src={img}
                      alt=''
                      className="w-full h-96 rounded-md object-cover"
                    />
                  </CardContent>
                </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
export default HeroCarousel