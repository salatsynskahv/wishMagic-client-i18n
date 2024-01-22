'use client'
import useSWR from "swr";
import {getUserWishlistByIdFetcher, getUserWishlistFetcher} from "@/components/services/api/WishlistService";
import Wishlist from "@/types/Wishlist";
import {WishItemCard} from "@/components/wishlist/card/wish/wishItemCard";
import {useAuth} from "@/components/context/AuthContext";
import CreateWishlist from "@/components/wishlist/createWishlist";
import {useAppSelector} from "@/lib/hooks";

export default  function Wishlists({params}: {params: {slug: string}}) {
    console.log(params.slug);
    const {user} = useAuth();
    // const wishlists = useAppSelector((state: any) => state.wishlist);

    const id = params.slug;
    const {data, error, isLoading} = useSWR<Wishlist>(`/api/wishlist/${id}`, getUserWishlistByIdFetcher);

    return (
        <div className="w-full justify-center items-center flex flex-col mx-3 my-10 gap-10">
            <h1 className="text-4xl">{data?.title}</h1>
            <div className="w-full flex gap-4">
                <CreateWishlist/>
                {data?.wishes.map(wish => <WishItemCard wishItem={wish} navigateWish={() => {}}/>)}
            </div>

        </div>
    )
}
