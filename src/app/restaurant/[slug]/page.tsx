import { prisma } from '@/app/db'
import Rating from '@/app/restaurant/components/Rating'
import { FC } from 'react'
import Description from '../components/Description'
import Images from '../components/Images'
import RestaurantNavbar from '../components/RestaurantNavbar'
import ResverationCard from '../components/ResverationCard'
import Reviews from '../components/Reviews'
import Title from '../components/Title'

interface pageProps {
    params: {
        slug: string
    }
}

const fetchRestaurant = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            id: true,
            name: true,
            images: true,
            description: true,
            slug: true,
            reviews: true
        }
    })
    if (!restaurant) {
        throw new Error('no restaurant')
    }
    return restaurant;
}

const RestaurantDetails: FC<pageProps> = async ({ params: { slug } }) => {
    const restaurant = await fetchRestaurant(slug);
    return (
        <>
            <div className="bg-white w-[70%] rounded p-3 shadow">
                <RestaurantNavbar slug={restaurant.slug} />
                <Title title={restaurant.name} />
                <Rating reviews={restaurant.reviews} />
                <Description description={restaurant.description} />
                <Images images={restaurant.images} />
                <Reviews reviews={restaurant.reviews} />
            </div>
            <div className="w-[27%] relative text-reg">
                <ResverationCard />
            </div>
        </>

    )
}

export default RestaurantDetails