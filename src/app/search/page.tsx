import { FC } from 'react'
import Navbar from '../components/Navbar'
import SearchHeader from './components/SearchHeader'
import SearchRestaurantCard from './components/SearchRestaurantCard'
import SearchSidebar from './components/SearchSidebar'

interface SearchPageProps {

}

const SearchPage: FC<SearchPageProps> = ({ }) => {
    return (
        <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">
                <Navbar />
                <SearchHeader />
                <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                    <SearchSidebar />
                    <div className="w-5/6">
                        <SearchRestaurantCard />
                    </div>
                </div>
            </main>
        </main>

    )
}

export default SearchPage