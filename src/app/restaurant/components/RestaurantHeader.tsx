"use client"
import { useParams } from "next/navigation";

const RestaurantHeader = () => {
    const params = useParams() as { slug: string }
    const renderTitle = (slug: string) => {
        console.log(slug)
        const nameArray = slug?.split("-");

        nameArray[nameArray?.length - 1] = `(${nameArray[nameArray?.length - 1]})`;

        return nameArray.join(" ");
    };
    return (
        <div className="h-96 overflow-hidden">
            <div
                className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center"
            >
                <h1 className="text-7xl text-white captitalize text-shadow text-center">
                    {renderTitle(params.slug)}
                </h1>
            </div>
        </div>
    )
}

export default RestaurantHeader