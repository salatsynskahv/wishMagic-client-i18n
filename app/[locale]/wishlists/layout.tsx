'use client';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useEffect, useState} from "react";
import {getUserWishlistFetcher} from "@/components/services/api/WishlistService";
import {init} from "@/components/store/slices/wishlistSlice";
import useSWR from "swr";
import Wishlist from "@/types/Wishlist";

export default function Layout({children}: { children: React.ReactNode }) {
    const wishlists = useAppSelector(state => state.wishlist.wishlists);
    const [isLoading, setIsLoading] = useState(true);
    const reduxDispatch = useAppDispatch();

    useEffect(() => {
        if (!wishlists || wishlists.length < 1) {
            getUserWishlistFetcher().then(
                (res) => {
                    console.log(res);
                    setIsLoading(false);
                    reduxDispatch(init({wishlists: res}));
                }
            ).catch(() => {
                setIsLoading(false);
            })
        }else {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {<div className="border-amber-800 flex flex-col h-screen">
                {children}
            </div>}
        </>
    )
}