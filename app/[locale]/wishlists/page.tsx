'use client'
import {useTranslations} from "next-intl"
import {useEffect, useState} from "react";
import WiButton from "@/components/elements/button";
import ModalCreateWishlist from "@/components/wishlist/modals/modalCreateWishlist";
import {WishlistCardThreeItems} from "@/components/wishlist/card/wishlist/wishlistCardThreeItems";
import {getUserWishlistFetcher} from "@/components/services/api/WishlistService";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {init} from "@/components/store/slices/wishlistSlice";


export default function WishlistsPage() {

    const t = useTranslations("Wishlists");
    const [showCreateWishlistModal, setShowCreateWishlistModal] = useState<boolean>(false);
    const wishlists = useAppSelector(state => state.wishlist.wishlists);
    // const reduxDispatch = useAppDispatch();
    //
    // useEffect(() => {
    //     if (!wishlists || wishlists.length < 1) {
    //         getUserWishlistFetcher().then(
    //             (res) => {
    //                 console.log(res);
    //                 reduxDispatch(init({wishlists: res}));
    //             }
    //         )
    //     }
    // }, []);
    console.log("WSH Page")

    return (
        <div className="flex flex-col gap-5 my-10 mx-3">
            <h1 className="text-4xl text-center">{t("my_wishlists")} </h1>
            <div>
                <WiButton onClickHandler={() => setShowCreateWishlistModal(true)}>
                    {t("new_wishlist")}
                </WiButton>
            </div>
            <div className="mx-3">
                {
                    wishlists && wishlists.map(item => <WishlistCardThreeItems key={item.id} wishlist={item}/>)
                }
            </div>
            <ModalCreateWishlist showModal={showCreateWishlistModal} setModalShow={setShowCreateWishlistModal}/>
        </div>
    )
}