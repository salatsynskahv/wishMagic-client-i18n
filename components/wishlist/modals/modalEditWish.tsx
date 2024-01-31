'use client'
import React, {useEffect, useReducer, useState} from "react";
import {serviceApi} from "@/components/services/api/ServiceApi";
import {Wish} from "@/types/Wish";
import Wishlist from "@/types/Wishlist";
import {updateWishRequest} from "@/components/services/api/WishlistService";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {addWish} from "@/components/store/slices/wishlistSlice";
import {useTranslations} from "next-intl";
import ModalWish from "@/components/wishlist/modals/modalWish";

export default function ModalEditWish({showModal, setShowModal, wish, wishlistId}:
{showModal: boolean, setShowModal: React.Dispatch<React.SetStateAction<Wish | null>>, wish: Wish | null, wishlistId: string }) {


    const reduxDispatch = useAppDispatch();

    function updateWish(wish: Wish) {
        updateWishRequest(wish).then(
            (result) => {
                reduxDispatch(addWish({wishlistId: wish.wishlistId, wish: wish}));
                setShowModal(null);
            }
        ).catch((error) => {

        })
    }



    return (
        <>
            {showModal ? (
                <ModalWish
                    wishInit = {wish}
                    wishlistId = {wishlistId}
                    setShowModal={setShowModal}
                    handleSubmit={updateWish}
                    submitLabel="update_wish"
                    modalTitle="edit_wish"
                >
                </ModalWish>
            ) : <></>}
        </>
    );
}