import Wishlist from "@/types/Wishlist";
import {WishItemCardDemo} from "@/components/wishlist/card/wishlist/wishlistCardDemo";
import {useRouter} from "next/navigation";

const defaultWish = {
    id: 1,
    wishlistId: 1,
    name: "Title",
    price: "30",
    imageUrl: "",
    link: "",
    likes: 49,
    comment: "More detailed description: colour, size"// Optional p
}

export const WishlistCardThreeItems = ({wishlist} :{wishlist: Wishlist}) => {
    const router = useRouter();
    const wishes = wishlist.wishes || [];
    return (
        <div onClick={() => router.push(`/wishlists/${wishlist.id}`)}
             className="bg-gray-100 w-fit h-fit inline-flex items-center flex-col rounded-xl " >
                <div className="outerWrap p-5">
                    <div className="layer0"><WishItemCardDemo wishItem={wishes[2] || defaultWish}/></div>
                    <div className="layer1"><WishItemCardDemo wishItem={wishes[1] ||defaultWish}/></div>
                    <div className="layer2"><WishItemCardDemo wishItem={wishes[0] || defaultWish}/></div>
                </div>
            <div className="pb-2">{wishlist.title}</div>
        </div>
    )
}