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

    const t = useTranslations('Wishlists');

    const [selectedWishlist, setSelectedWishlist] = useState<Wishlist | null>(null);
    const reduxDispatch = useAppDispatch();
    const dataReducer = (state: any, action: any) => {
        if (action.type === "init") {
            return {...action.payload};
        }
        if (action.type === "input") {
            return {...state, [action.payload.name]: action.payload.value}
        }
    }

    const [data, dispatchData] = useReducer(dataReducer, {});

    useEffect(() => {
        dispatchData({
            type : "init",
            payload: {...wish}
        })
    }, [wish]);
    // console.log(wish);
    console.log(data);



    function updateWish() {
        console.log(data);
        const wishRequest = {wishlistId: selectedWishlist?.id || wishlistId, ...data};
        console.log(wishRequest);
        updateWishRequest(wishRequest).then(
            (result) => {
                reduxDispatch(addWish({wishlistId: wishlistId, wish: data}));
                setShowModal(null);
            }
        ).catch((error) => {

        })
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
                <ModalWish
                    data={data}
                    dispatchData={dispatchData}
                    setShowModal={setShowModal}
                    handleSelectChange={handleSelectChange}
                >
                    <div
                        className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(null)}
                        >
                            {t('close')}
                        </button>
                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={updateWish}
                        >
                            {t('update_wish')}
                        </button>
                    </div>
                </ModalWish>
            ) : <></>}
        </>
    );
}