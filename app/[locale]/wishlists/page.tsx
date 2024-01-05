'use client'
import WishlistComponent from "@/components/wishlist/wishlistComponent";
import Wishlist from "@/types/Wishlist";
import {useAppSelector} from "@/lib/hooks";

export default function Wishlists() {

    const wishlists = useAppSelector((state: any) => state.wishlist);
    console.log(wishlists);

    if(!wishlists || !wishlists.wishlists ||  wishlists.wishlists?.length < 1) {
        return null;
    }

    return (
        <div className="mx-6 my-10 grid grid-cols-4 gap-1" id="wishlists-section">
        {wishlists && wishlists?.wishlists.map((wishlist: Wishlist) => <WishlistComponent wishlist={wishlist}/>)}
    </div>
    )
}
