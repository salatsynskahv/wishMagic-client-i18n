'use client';
import {useTranslations} from "next-intl";
import {WishItemCard} from "@/components/wishlist/wishItemCard";
import {defaultWishes} from "@/types/Wish";
import {useAppSelector} from "@/lib/hooks";
import wishlist from "@/types/Wishlist";
import {useEffect} from "react";
import Wishlist from "@/types/Wishlist";

function PopularWishes() {
    const t = useTranslations('Wishlists');
    // const wishlists: {wishlists: Wishlist[]} = useAppSelector((state) => state.wishlist);
    // console.log(wishlists);
    return (<div>
        <div className="flex justify-center w-full">
            <h1 className="text-2xl">{t("popular_wishes")}</h1>
        </div>
        <div className="flex gap-5  scroll">
            {/*{wishlists.map(*/}
            {/*    wishlist => wishlist.wishes.map(item =>*/}
            {/*        <WishItemCard wishItem={item} navigateWish={() => {}}/>)}*/}
        </div>

    </div>)

}

export default PopularWishes;