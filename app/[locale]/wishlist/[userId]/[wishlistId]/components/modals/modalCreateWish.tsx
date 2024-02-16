'use client'
import React from "react";
import {Wish} from "@/types/Wish";
import {createWishRequest} from "@/components/services/api/WishlistService";
import ModalWish from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/modals/modalWish";

export default function ModalCreateWish({showModal, setShowModal, wishlistId}: {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    wishlistId: number
}) {

    function createWish(wish: Wish) {
        createWishRequest(wish)
            .then( (result) => {
                    console.log("create Wish");
                    console.log(result);
                    setShowModal(false);
                }
            )
            .catch((error) => {})
    }


    return (
        <>
            {showModal ? (
                <>
                    {/*<ModalWish*/}
                    {/*    wishlistId={wishlistId}*/}
                    {/*    setShowModal={setShowModal}*/}
                    {/*    handleSubmit={createWish}*/}
                    {/*    submitLabel='create'*/}
                    {/*    wishInit={null}*/}
                    {/*    modalTitle="create_wish"*/}
                    {/*>*/}
                    {/*</ModalWish>*/}
                </>
            ) : <></>}
        </>
    )
        ;
}