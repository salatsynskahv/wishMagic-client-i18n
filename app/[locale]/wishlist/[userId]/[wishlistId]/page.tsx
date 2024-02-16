import {config} from "@/components/Constants";
import WishlistPage from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/wishlist/wishlistPage";
import Wishlist from "@/types/Wishlist";
import {revalidatePath} from "next/cache";


export default async function Wishlists({params}: { params: { wishlistId: string, userId: string } }) {

    const id = Number(params.wishlistId);
    const res = await fetch(`${config.url.API_BASE_URL}/api/wishlist/${id}`,
        {
            cache: "no-cache"
        }
    );
    revalidatePath(`/wishlist/1/${id}`);
    const wishlist: Wishlist = await res.json();

    return (
        wishlist && <WishlistPage wishlist={wishlist} userId={params.userId}/>
    )
}
