import { prisma } from '@/app/db'
import Menu from '../../components/Menu'
import RestaurantNavbar from '../../components/RestaurantNavbar'


const fetchItems = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            items: true
        }
    })
    if (!restaurant) {
        throw new Error('fech items no restraunts')
    }
    return restaurant;
}
const MenuPage = async ({ params: { slug } }: { params: { slug: string } }) => {
    console.log({ slug })
    const menu = await fetchItems(slug);
    console.log({ menu })
    return (
        <>
            <div className="bg-white w-[100%] rounded p-3 shadow">
                <RestaurantNavbar slug={slug} />
                <Menu menu={menu.items} />
            </div>
        </>
    )
}

export default MenuPage  