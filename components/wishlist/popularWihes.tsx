'use client';
import {useTranslations} from "next-intl";
import {WishItemCard} from "@/components/wishlist/card/wish/wishItemCard";
import {defaultWishes} from "@/types/Wish";
import {useAppSelector} from "@/lib/hooks";
import wishlist from "@/types/Wishlist";
import {useEffect} from "react";
import Wishlist from "@/types/Wishlist";
import useSWR from "swr";
import {getUserWishlistFetcher} from "@/components/services/api/WishlistService";
import {useAuth} from "@/components/context/AuthContext";
import {WishItemCardDemo} from "@/components/wishlist/card/wishlist/wishlistCardDemo";

function PopularWishes() {
    const t = useTranslations('Wishlists');
    const {user} = useAuth();
    // const wishlists: {wishlists: Wishlist[]} = useAppSelector((state) => state.wishlist);
    // console.log(wishlists);
    const {data, error, isLoading} = useSWR<Wishlist[]>(['/api/wishlists', user], getUserWishlistFetcher);
    return (
        <>
            <div className="flex justify-center w-full">
                <h1 className="text-2xl">{t("popular_wishes")}</h1>
            </div>
            <div className="flex gap-5  scroll">
                {!!data && data.map(
                    wishlist => wishlist.wishes.map(item =>
                        <WishItemCardDemo wishItem={item}/>))
                }
            </div>

        </>)

}

export default PopularWishes;