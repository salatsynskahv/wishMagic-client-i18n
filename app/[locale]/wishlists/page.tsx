'use client'
import {useTranslations} from "next-intl"
import React, {useEffect, useState} from "react";
import WiButton from "@/components/elements/button";
import ModalCreateWishlist from "@/components/wishlist/modals/modalCreateWishlist";
import {WishlistCardThreeItems} from "@/components/wishlist/card/wishlist/wishlistCardThreeItems";
import {getUserWishlistFetcher} from "@/components/services/api/WishlistService";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {init} from "@/components/store/slices/wishlistSlice";
import {FiPlusCircle} from "react-icons/fi";
import clsx from "clsx";
import Wishlist from "@/types/Wishlist";
import {WishItemCard} from "@/components/wishlist/card/wish/wishItemCard";
import CreateWish from "@/components/wishlist/createWishlist";


export default function WishlistsPage() {

    const t = useTranslations("Wishlists");
    const [showCreateWishlistModal, setShowCreateWishlistModal] = useState<boolean>(false);
    const wishlists: Wishlist[] = useAppSelector(state => state.wishlist.wishlists);
    const [selectedList, setSelectedList] = useState(wishlists[0]);
    console.log("WSH Page");


    return (
        <>
            <div className={clsx("flex flex-col my-10 mx-6",
                {
                    'opacity-30': showCreateWishlistModal
                })}>
                <h1 className="text-4xl text-center">{t("my_wishlists")} </h1>
                <div className="flex gap-1 mx-3">

                    {
                        wishlists && wishlists.map(item =>
                            <button

                                className={clsx("px-6 py-3 rounded-t-2xl  justify-center items-center gap-1 inline-flex",
                                    {
                                        'bg-indigo-100': item.title === selectedList.title,
                                        'bg-indigo-50 bg-opacity-50': item.title !== selectedList.title,
                                    })}
                                key={item.id}
                                onClick={(e) => setSelectedList(item)}
                            >
                                {item.title}
                            </button>)
                    }
                    <button
                        className={"px-6 py-3  rounded-t-2xl bg-white bg-opacity-50 justify-center items-center  inline-flex"}
                        onClick={() => setShowCreateWishlistModal(true)}>
                        {t("new_wishlist")}
                        <FiPlusCircle/>
                    </button>
                </div>
                <div className="flex bg-indigo-100 w-full justify-center  py-10 rounded-xl">
                    <div className="flex flex-wrap gap-4 w-fit">
                        <CreateWish wishlistId={selectedList.id}></CreateWish>
                        {
                            selectedList.wishes?.map((wish) => <WishItemCard wishItem={wish} key={wish.id}
                                                                             selectWish={() => {
                                                                             }}/>)
                        }
                    </div>
                </div>

            </div>
            <ModalCreateWishlist showModal={showCreateWishlistModal} setModalShow={setShowCreateWishlistModal}/>
        </>
    )
}