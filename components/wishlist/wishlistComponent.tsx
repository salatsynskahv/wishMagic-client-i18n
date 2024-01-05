import Wishlist from "@/types/Wishlist";
import {WishItemCard} from "@/components/wishlist/wishItemCard";
import {useRouter} from "next/navigation";

const WishlistComponent = ({wishlist}: {
    wishlist: Wishlist
}) => {
    const route = useRouter();
    return (
        <>
            {
                wishlist.wishes && wishlist.wishes.map(
                    wish =>
                        <WishItemCard navigateWish={() => { route.push(`wishlists/wish/${wishlist.id}/${wish.id}`)
                        }} wishItem={wish}></WishItemCard>
                )
            }
        </>
    );
};

export default WishlistComponent;