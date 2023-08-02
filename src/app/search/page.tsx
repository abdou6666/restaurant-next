import { Metadata } from 'next'
import { FC } from 'react'
import SearchHeader from './components/SearchHeader'
import SearchRestaurantCard from './components/SearchRestaurantCard'
import SearchSidebar from './components/SearchSidebar'

interface SearchPageProps {

}
export const metadata: Metadata = {
    title: 'search',
}

const SearchPage: FC<SearchPageProps> = ({ }) => {
    return (
        <>
            <SearchHeader />
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSidebar />
                <div className="w-5/6">
                    <SearchRestaurantCard />
                </div>
            </div>
        </>

    )
}

export default SearchPage