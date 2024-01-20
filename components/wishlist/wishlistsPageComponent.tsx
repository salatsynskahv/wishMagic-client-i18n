'use client';
import {config} from "@/components/Constants";
import {apiInstance, bearerAuth, bearerAuthWithUser} from "@/components/services/api/AxiosInstance";
import {useAuth} from "@/components/context/AuthContext";
import useSWR from "swr";
import {getUserWishlistFetcher} from "@/components/services/api/WishlistService";
import Wishlist from "@/types/Wishlist";
import {useEffect, useState} from "react";
import {WishlistCard} from "@/components/wishlist/wishlistCard";
import wishlist from "@/types/Wishlist";
import {Wish} from "@/types/Wish";
import {Hash} from "crypto";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "@/lib/hooks";
import { init } from "../store/slices/wishlistSlice";


const defaultWish: Wish = {
    id: 1,
    wishlistId: 1,
    name: "One",
    price: "20",
    imageUrl: "",
    link: "",
    comment: ""// Optional p
}
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
                data && data.map(item => <WishlistCard wishlist={item}/>)
            }
        </div>
    )

}

export default WishlistsPageComponent