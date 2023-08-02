import { PRICE } from '@prisma/client'

export default function Price({ price }: { price: PRICE }) {
    const renderPrice = () => {
        if (price === PRICE.CHEAP) {
            return <>

                <span>$$</span> <span className='text-gray-400'>$$</span>
            </>
        }
        else if (price === PRICE.REGULAR) {
            <>
                <span>$$$</span> <span className='text-gray-400'>$</span>
            </>
        } else {
            <>
                <span>$$$$</span>
            </>
        }
    }
    return (
        <p className="flex mr-3">{renderPrice()}</p>

    )
}
