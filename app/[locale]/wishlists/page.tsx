'use client'
import {useTranslations} from "next-intl"
import {config} from "@/components/Constants";
import {bearerAuth} from "@/components/services/api/AxiosInstance";
import Wishlist from "@/types/Wishlist";
import WishlistsPageComponent from "@/components/wishlist/wishlistsPageComponent";
import {useAuth} from "@/components/context/AuthContext";
import {useState} from "react";
import WiButton from "@/components/elements/button";


export default function WishlistsPage() {

    const t = useTranslations("Wishlists");
    return (
        <div className="flex flex-col gap-5 my-10 mx-3">
            <h1 className="text-4xl text-center">{t("my_wishlists")} </h1>
            <div>
                <WiButton>
                     {t("new_wishlist")}
                </WiButton>
            </div>
            <WishlistsPageComponent/>
            </div>
    )
}