import Link from "next/link";
import Wishlist from "@/types/Wishlist";
import {WishItemCard} from "@/components/wishlist/wishItemCard";

const defaultWish = {
    id: 1,
    wishlistId: 1,
    name: "One",
    price: "20",
    imageUrl: "",
    link: "",
    comment: ""// Optional p
}

export const WishlistCard = ({wishlist} :{wishlist: Wishlist}) => {
    const wishes = wishlist.wishes;
    return (
        <Link href={`/wishlists/${wishlist.id}`} className="" >
            <h1>{wishlist.title}</h1>

                <div className="outerWrap">
                    <div className="layer0"><WishItemCard wishItem={defaultWish} navigateWish={()=> {}}/></div>
                    <div className="layer1"><WishItemCard wishItem={defaultWish} navigateWish={()=> {}}/></div>
                    <div className="layer2"><WishItemCard wishItem={defaultWish} navigateWish={()=> {}}/></div>
                </div>

        </Link>
    )
}