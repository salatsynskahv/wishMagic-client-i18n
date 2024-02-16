'use client';
import {useTranslations} from "next-intl";
import Wishlist from "@/types/Wishlist";
import useSWR from "swr";
import {getUserWishlistFetcher} from "@/components/services/api/WishlistService";
import {useAuth} from "@/components/context/AuthContext";
import {WishItemCardDemo} from "@/components/wishlist/card/wishlist/wishlistCardDemo";

function PopularWishes() {

    const t = useTranslations('Wishlists');
    const {user} = useAuth();
    const {data, error, isLoading} = useSWR<Wishlist[]>(['/api/wishlists', user], getUserWishlistFetcher);

    return (
        <div className="invisible sm:visible sm:mx-3">
            <div className="flex justify-center w-full my-4">
                <h1 className="text-2xl">{t("popular_wishes")}</h1>
            </div>
            <div className="flex gap-5  sm:scroll">
                {!!data && data.map(
                    wishlist => wishlist.wishes && wishlist.wishes.map(item =>
                        <WishItemCardDemo wishItem={item}/>))
                }
            </div>
        </div>
    )

}

export default PopularWishes;