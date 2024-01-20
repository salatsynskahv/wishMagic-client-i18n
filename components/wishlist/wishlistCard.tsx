import Link from "next/link";
import Wishlist from "@/types/Wishlist";
import {WishItemCard} from "@/components/wishlist/wishItemCard";
import {WishItemCardDemo} from "@/components/wishlist/card/wishlistCardDemo";
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

export const WishlistCard = ({wishlist} :{wishlist: Wishlist}) => {
    const router = useRouter();
    const wishes = wishlist.wishes;
    return (
        <div onClick={() => router.push(`/wishlists/${wishlist.id}`)}
             className="bg-amber-50 w-fit h-fit flex items-center flex-col" >
                <div className="outerWrap p-5">
                    <div className="layer0"><WishItemCardDemo wishItem={wishlist.wishes[2] || defaultWish}/></div>
                    <div className="layer1"><WishItemCardDemo wishItem={wishlist.wishes[1] ||defaultWish}/></div>
                    <div className="layer2"><WishItemCardDemo wishItem={wishlist.wishes[0] || defaultWish}/></div>
                </div>
            <div className="pb-2">{wishlist.title}</div>
        </div>
    )
}