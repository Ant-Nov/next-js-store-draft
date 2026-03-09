import Link from "next/link"
import { Button } from "../ui/button"
import HeroCarousel from "./HeroCarousel"

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 items-center gap-5">
      <div>
        <h1 className="font-bold text-6xl mb-8">We are changing the way people shop</h1>
   
        <p className="mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eius in? Harum, cupiditate? Fugit libero officiis quisquam quos magnam rerum deserunt quae ducimus impedit, alias voluptatibus nobis exercitationem dicta hic?</p>

        <Button asChild>
          <Link href="/products">Our Products</Link>
        </Button>
      </div>

      <HeroCarousel />
    </div>
  )
}
export default Hero