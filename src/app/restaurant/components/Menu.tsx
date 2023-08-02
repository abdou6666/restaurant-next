import { Item } from '@prisma/client'
import { FC } from 'react'
import MenuCard from './MenuCard'

interface MenuProps {
    menu: Item[]
}

const Menu: FC<MenuProps> = ({ menu }) => {
    return (
        <main className="bg-white mt-5">
            <div>
                <div className="mt-4 pb-1 mb-1">
                    <h1 className="font-bold text-4xl">Menu</h1>
                </div>
                <div className="flex flex-wrap justify-between">
                    {menu.length ? (menu.map(item => (
                        <MenuCard item={item} key={item.id} />
                    ))) :
                        (
                            <>
                                <h1>This Restaurant does not have a menu.</h1>
                            </>
                        )

                    }
                </div>
            </div>
        </main>
    )
}

export default Menu