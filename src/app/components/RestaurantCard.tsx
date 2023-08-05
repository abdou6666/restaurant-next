import { Cuisine, Location, PRICE, Restaurant } from '@prisma/client'
import Link from 'next/link'
import { FC } from 'react'
import { RestaurantCardType } from '../page'
import Price from './Price'


interface RestaurantCardProps {
    restaurant: RestaurantCardType,

}

const RestaurantCard: FC<RestaurantCardProps> = ({ restaurant }) => {
    return (
        <div className="py-3 px-36 mt-10 flex flex-wrap justify-center" >
            <Link href={`/restaurant/${restaurant.slug}`}>
                <div className="w-44 h-72 m-3 rounded overflow-hidden border cursor-pointer">
                    <img
                        src={restaurant.main_image}
                        alt=""
                        className="w-full h-36"
                    />
                    <div className="p-1">
                        <h3 className="font-bold text-2xl mb-2 capitalize">{restaurant.name}</h3>
                        <div className="flex items-start">
                            <div className="flex mb-2">*****</div>
                            <p className="ml-2">77 reviews</p>
                        </div>
                        <div className="flex text-reg font-light capitalize">
                            <p className=" mr-3">{restaurant.cuisine.name}</p>
                            <Price price={restaurant.price} />
                            <p>{restaurant.location.name}</p>
                        </div>
                        <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
                    </div>
                </div>
            </Link>
        </div >
    )
}

export default RestaurantCard