import { PRICE, Review } from "@prisma/client";
import { Metadata } from "next";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import { prisma } from "./db";



export type RestaurantCardType = {
  id: number;
  name: string;
  main_image: string;
  price: PRICE;
  slug: string;
  location: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  cuisine: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  reviews: Review[]
}


const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  // const r = await prisma.location.findMany()
  return await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      reviews: true
    }
  })
}

export const metadata: Metadata = {
  title: 'OpenTable',
}
export default async function Home() {
  const restaurants = await fetchRestaurants();
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
    </main>
  )
}
