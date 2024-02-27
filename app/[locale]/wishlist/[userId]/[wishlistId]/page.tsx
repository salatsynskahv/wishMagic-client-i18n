import {config} from "@/components/Constants";
import WishlistPage from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/wishlist/wishlistPage";
import {getUserWishlistById} from "@/app/[locale]/lib/actions";


export default async function Wishlists({params}: { params: { wishlistId: string, userId: string } }) {

    const id = Number(params.wishlistId);
    const wishlist = await getUserWishlistById(id);

    return (
        wishlist && <WishlistPage wishlist={wishlist} userId={params.userId}/>
    );
}
