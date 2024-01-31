'use client'
import React, {useEffect, useReducer, useState} from "react";
import {Wish} from "@/types/Wish";
import Wishlist from "@/types/Wishlist";
import {createWishRequest, getUserWishlistFetcher} from "@/components/services/api/WishlistService";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {addWish} from "@/components/store/slices/wishlistSlice";
import ModalWish from "@/components/wishlist/modals/modalWish";

export default function ModalCreateWish({showModal, setShowModal, wishlistId}: {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    wishlistId: string
}) {

    const reduxDispatch = useAppDispatch();
    function createWish(wish: Wish) {
        createWishRequest(wish)
            .then( (result) => {
                    console.log("create Wish");
                    console.log(result);
                    reduxDispatch(addWish({wishlistId: wish.wishlistId, wish: result.data}));
                    setShowModal(false);
                }
            )
            .catch((error) => {})
    }


    return (
        <>
            {showModal ? (
                <>
                    <ModalWish
                        wishlistId={wishlistId}
                        setShowModal={setShowModal}
                        handleSubmit={createWish}
                        submitLabel='create'
                        wishInit={null}
                        modalTitle="create_wish"
                    >
                    </ModalWish>
                </>
            ) : <></>}
        </>
    )
        ;
}