import Searchbar from '@/app/components/Searchbar'
import { FC } from 'react'

interface SearchHeaderProps {

}

const SearchHeader: FC<SearchHeaderProps> = ({ }) => {
    return (
        <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
            <div className="text-left text-lg py-3 m-auto flex justify-center">
                <Searchbar />
            </div>
        </div>
    )
}

export default SearchHeader