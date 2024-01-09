'use client';
import {useTranslations} from "next-intl";
import {WishItemCard} from "@/components/wishlist/wishItemCard";
import {defaultWishes} from "@/types/Wish";

function PopularWishes() {
    const t = useTranslations('Wishlists');

    return (<div>
        <div className="flex justify-center w-full">
            <h1 className="text-2xl">{t("popular_wishes")}</h1>
        </div>
        <div className="flex gap-5  scroll">
            {defaultWishes.map(item => <WishItemCard wishItem={item} navigateWish={() => {}}/>)}
        </div>

    </div>)

}

export default PopularWishes;