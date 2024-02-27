'use client'
import {FiPlusCircle} from "react-icons/fi";
import React, {useState} from "react";
import {useTranslations} from "next-intl";
import ModalCreateWishlist from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/modals/modalCreateWishlist";


export function CreateWishlistButton() {
    const t = useTranslations("Wishlists");
    const [showCreateWishlistModal, setShowCreateWishlistModal] = useState<boolean>(false);

    return (
        <>
            <button
                className="flex items-center gap-1 bg-emerald-500 text-white active:bg-emerald-600 px-4 py-2 rounded-xl
                shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                onClick={() => setShowCreateWishlistModal(true)}
            >
                {t("new_wishlist")}
                <FiPlusCircle/>
            </button>
            <ModalCreateWishlist
                showModal={showCreateWishlistModal}
                setModalShow={setShowCreateWishlistModal}
            />
        </>)
}