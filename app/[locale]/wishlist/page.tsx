import {getUser, getUserWishlists} from "@/app/[locale]/lib/actions";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";


export default async function Page() {
    const user = await getUser();
    const wishlists: any = await getUserWishlists();
    let wishlistId;
    if(wishlists && wishlists[0]) {
        wishlistId = wishlists[0].id;
    }

    if(wishlistId) {
        revalidatePath(`/wishlist/${user.id}/${wishlistId}`)
        redirect(`/wishlist/${user.id}/${wishlistId}`);
    }else {
        redirect('/');
    }
}