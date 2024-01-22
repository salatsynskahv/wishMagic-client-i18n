'use client'
import {useTranslations} from "next-intl"
import {config} from "@/components/Constants";
import {bearerAuth} from "@/components/services/api/AxiosInstance";
import Wishlist from "@/types/Wishlist";
import WishlistsPageComponent from "@/components/wishlist/wishlistsPageComponent";
import {useAuth} from "@/components/context/AuthContext";
import {useState} from "react";


export default function WishlistsPage() {

    const t = useTranslations("Wishlists");
    return (
        <div className="flex flex-col gap-5 my-10 mx-3">
            <h1 className="text-4xl text-center">{t("my_wishlists")} </h1>
            <div>
                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    {t("new_wishlist")}
                </button>
            </div>
            <WishlistsPageComponent/>
            </div>
    )
}