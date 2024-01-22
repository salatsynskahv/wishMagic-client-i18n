'use client'
import React, {useEffect, useReducer, useState} from "react";
import {serviceApi} from "@/components/services/api/ServiceApi";
import {Wish} from "@/types/Wish";
import Wishlist from "@/types/Wishlist";
import {createWishRequest} from "@/components/services/api/WishlistService";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useRouter} from "next/navigation";
// @ts-ignore
import {addWish} from "@/components/store/slices/wishlistSlice";
import ModalWish from "@/components/wishlist/modals/modalWish";

export default function ModalCreateWish({showModal, setShowModal}: {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}) {

    const [link, setLink] = useState<string>();

    const wishlists = useAppSelector((state: any) => state.wishlist);
    const [selectedWishlist, setSelectedWishlist] = useState<Wishlist | null>(null);

    const reduxDispatch = useAppDispatch()
    const dataReducer = (state: any, action: any) => {
        if (action.type === "init") {
            return {...state, ...action.payload};
        }
        if (action.type === "input") {
            return {...state, [action.payload.name]: action.payload.value}
        }
    }

    const [data, dispatchData] = useReducer(dataReducer, {});

    function createWish() {
        const wish: Wish = {
            wishlistId: selectedWishlist?.id || wishlists.wishlists[0]?.id,
            ...data
        }

        createWishRequest(wish).then(
            (result) => {
                console.log(result);
                reduxDispatch(addWish({wishlistId: wish.wishlistId, wish: wish}));
                setShowModal(false);
            }
        ).catch((error) => {})
    }


    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value, 10);
        // @ts-ignore
        const selected = wishlists.wishlists.find((wishlist) => wishlist.id === selectedId);
        setSelectedWishlist(selected);
    };


    return (
        <>
            {showModal ? (
                <>
                    <ModalWish
                        data={data}
                        dispatchData={dispatchData}
                        setShowModal={setShowModal}
                        handleSelectChange={handleSelectChange}
                    >
                        {/*footer*/}
                        <div
                            className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={createWish}
                            >
                                Add wish
                            </button>
                        </div>
                    </ModalWish>
                </>
            ) : <></>}
        </>
    )
        ;
}