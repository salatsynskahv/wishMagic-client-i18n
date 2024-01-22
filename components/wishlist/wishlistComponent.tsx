'use client'
import Wishlist from "@/types/Wishlist";
import {WishItemCard} from "@/components/wishlist/card/wish/wishItemCard";
import {useRouter} from "next/navigation";

const WishlistComponent = ({wishlist}: {
    wishlist: Wishlist
}) => {
    const route = useRouter();
    return (
        <>
            <p>{wishlist.title}</p>
            {
                wishlist.wishes && wishlist.wishes.map(
                    wish =>
                        <WishItemCard wishItem={wish} selectWish={()=> {}}></WishItemCard>
                )
            }
        </>
    );
};

export default WishlistComponent;