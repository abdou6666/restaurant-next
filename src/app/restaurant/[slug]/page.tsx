import Navbar from '@/app/components/Navbar'
import Rating from '@/app/restaurant/components/Rating'
import { FC } from 'react'
import Description from '../components/Description'
import Images from '../components/Images'
import RestaurantHeader from '../components/RestaurantHeader'
import RestaurantNavbar from '../components/RestaurantNavbar'
import ResverationCard from '../components/ResverationCard'
import Reviews from '../components/Reviews'
import Title from '../components/Title'

interface pageProps {

}

const RestaurantDetails: FC<pageProps> = ({ }) => {
    return (
        <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">
                <Navbar />
                <RestaurantHeader />
                {/* DESCRIPTION PORTION */}
                <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
                    <div className="bg-white w-[70%] rounded p-3 shadow">
                        <RestaurantNavbar />
                        <Title />
                        <Rating />
                        <Description />
                        <Images />
                        <Reviews />
                    </div>
                    <div className="w-[27%] relative text-reg">
                        <ResverationCard />
                    </div>
                </div>
            </main>
        </main>

    )
}

export default RestaurantDetails