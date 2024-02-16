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
                className={"px-6 py-3  rounded-t-2xl bg-white bg-opacity-50 justify-center items-center  inline-flex"}
                onClick={() => setShowCreateWishlistModal(true)}>
                {t("new_wishlist")}
                <FiPlusCircle/>
            </button>
            <ModalCreateWishlist showModal={showCreateWishlistModal} setModalShow={setShowCreateWishlistModal}/>
        </>)
}