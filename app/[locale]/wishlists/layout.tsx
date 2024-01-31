'use client';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useEffect} from "react";
import {getUserWishlistFetcher} from "@/components/services/api/WishlistService";
import {init} from "@/components/store/slices/wishlistSlice";

export default function Layout({children}: {children: React.ReactNode}) {
    const wishlists = useAppSelector(state => state.wishlist.wishlists);
    const reduxDispatch = useAppDispatch();

    console.log("WSH LAYOUT")
    useEffect(() => {
        if (!wishlists || wishlists.length < 1) {
            getUserWishlistFetcher().then(
                (res) => {
                    console.log(res);
                    reduxDispatch(init({wishlists: res}));
                }
            )
        }
    }, []);
    return (
        <div className="border-amber-800 flex flex-col h-screen">
            {children}
        </div>
    )
}