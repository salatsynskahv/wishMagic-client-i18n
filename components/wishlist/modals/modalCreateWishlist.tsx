import WiButton from "@/components/elements/button";
import Wishlist from "@/types/Wishlist";
import React, {ChangeEvent, useState} from "react";
import {useTranslations} from "next-intl";
import WiInput from "@/components/elements/input";
import createWishlist from "@/components/wishlist/createWishlist";
import {createWishlistRequest} from "@/components/services/api/WishlistService";
import {useAppDispatch} from "@/lib/hooks";
import {add} from "@/components/store/slices/wishlistSlice";


function ModalCreateWishlist({showModal, setModalShow}: { showModal: boolean, setModalShow: any }) {
    const t = useTranslations('Wishlists');
    const reduxDispatch = useAppDispatch();

    const [wishlistTitle, setWishlistTitle] = useState<string>("");
    const createWishlistHandler = () => {
        const wishlistDto = {title: wishlistTitle}
        createWishlistRequest(wishlistDto).then(
            res => {
                reduxDispatch(add({wishlist: res.data}));
                setWishlistTitle("");
                setModalShow(false);
            }
        )
    }

    return (
        showModal &&
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div
                    className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div
                        className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-xl font-semibold">
                            {t('create_wishlist')}
                        </h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                        <p className="my-1 text-blueGray-500 text-l font-medium leading-relaxed">
                            {t('wishlist_name')}
                        </p>
                        <WiInput
                            value={wishlistTitle}
                            handleChange={(e: any) => {
                                setWishlistTitle(e.target.value)
                            }}
                        />
                        <div className="w-full flex justify-center">
                            <WiButton
                                className="my-6 bg-green-50"
                                onClickHandler={createWishlistHandler}>
                                {t('create')}
                            </WiButton>
                            <WiButton
                                className="my-6 bg-red-50"
                                onClickHandler={() => setModalShow(false)}>
                                    {t('close')}
                            </WiButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCreateWishlist;