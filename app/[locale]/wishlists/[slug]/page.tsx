'use client'
import useSWR from "swr";
import {getUserWishlistByIdFetcher, getUserWishlistFetcher} from "@/components/services/api/WishlistService";
import Wishlist from "@/types/Wishlist";
import {WishItemCard} from "@/components/wishlist/wishItemCard";
import {useAuth} from "@/components/context/AuthContext";
import {CreateWishlistCard} from "@/components/wishlist/createWishlistCard";

export default  function Wishlists({params}: {params: {slug: string}}) {
    console.log(params.slug);
    const {user} = useAuth();
    // const wishlists = useAppSelector((state: any) => state.wishlist);

    const id = params.slug;
    const {data, error, isLoading} = useSWR<Wishlist>(`/api/wishlist/${id}`, getUserWishlistByIdFetcher);

    return (
        <>
            <h1>{data?.title}</h1>
            <CreateWishlistCard/>

            {data?.wishes.map(wish => <WishItemCard wishItem={wish} navigateWish={() => {}}/>)}
        </>
    )
}
