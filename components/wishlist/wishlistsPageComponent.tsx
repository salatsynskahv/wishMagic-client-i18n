'use client';
import {useAuth} from "@/components/context/AuthContext";
import useSWR from "swr";
import {getUserWishlistFetcher} from "@/components/services/api/WishlistService";
import Wishlist from "@/types/Wishlist";
import {useEffect} from "react";
import {WishlistCardThreeItems} from "@/components/wishlist/card/wishlist/wishlistCardThreeItems";
import {useAppDispatch} from "@/lib/hooks";
import { init } from "../store/slices/wishlistSlice";

function WishlistsPageComponent() {
    const {user} = useAuth();
    const {data, error, isLoading} = useSWR<Wishlist[]>(['/api/wishlists', user], getUserWishlistFetcher);
    const reduxDispatch = useAppDispatch();
    useEffect(() => {
        reduxDispatch(init({wishlists: data}));
    }, [data]);

    return (
        <div className="mx-3">
            {
                data && data.map(item => <WishlistCardThreeItems wishlist={item}/>)
            }
        </div>
    )

}

export default WishlistsPageComponent