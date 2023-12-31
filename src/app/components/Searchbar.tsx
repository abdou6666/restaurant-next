"use client"
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react'

interface SearchbarProps {

}

const Searchbar: FC<SearchbarProps> = ({ }) => {
    const router = useRouter();
    const [location, setLocation] = useState('')
    return (
        <div className="text-left text-lg py-3 m-auto flex justify-center">
            <input
                className="rounded  mr-3 p-2 w-[450px]"
                type="text"
                placeholder="State, city or town"
                onChange={e => setLocation(e.target.value)}
                value={location}
            />
            <button className="rounded bg-red-600 px-9 py-2 text-white" onClick={() => {
                if (location === '') return
                router.push(`search?city=${location}`)
                setLocation('')
            }}>
                Lets go
            </button>
        </div>
    )
}

export default Searchbar