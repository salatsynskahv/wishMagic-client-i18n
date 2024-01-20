'use client'
import {useTranslations} from "next-intl"
import {config} from "@/components/Constants";
import {bearerAuth} from "@/components/services/api/AxiosInstance";
import Wishlist from "@/types/Wishlist";
import WishlistsPageComponent from "@/components/wishlist/wishlistsPageComponent";
import {useAuth} from "@/components/context/AuthContext";
import {useState} from "react";


export default function WishlistsPage() {
    const [wishlists, setWishlists]  = useState<Wishlist[]>([]);
    // useEffect(() => {

    const t = useTranslations("Wishlists");
    return (
        <div className="flex flex-col gap-5 my-10">
            <h1 className="text-4xl text-center">{t("my_wishlists")} </h1>
            <WishlistsPageComponent/>
            </div>
    )
}