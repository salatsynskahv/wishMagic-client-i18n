'use client'
import useSWR from "swr";
import {getUserWishlistByIdFetcher, getUserWishlistFetcher} from "@/components/services/api/WishlistService";
import Wishlist from "@/types/Wishlist";
import {WishItemCard} from "@/components/wishlist/card/wish/wishItemCard";
import CreateWish from "@/components/wishlist/createWishlist";
import ModalEditWish from "@/components/wishlist/modals/modalEditWish";
import {useEffect, useMemo, useState} from "react";
import {Wish} from "@/types/Wish";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {config} from "@/components/Constants";
import {init} from "@/components/store/slices/wishlistSlice";


export default function Wishlists({params}: { params: { wishlistId: string } }) {

    const id = Number(params.wishlistId);
    const [editWish, setEditWish] = useState<Wish | null>(null);
    const [wishlist, setWishlist] = useState<Wishlist | undefined>();
    const wishLists: Wishlist[] = useAppSelector((state) => state.wishlist.wishlists);
    const reduxDispatch = useAppDispatch();

    useEffect(() => {
        if (!wishLists || wishLists.length < 1) {
            getUserWishlistFetcher().then(
                (res) => {
                    console.log(res);
                    const value = wishLists.find(wishlist => wishlist.id === +id);
                    setWishlist(value);
                    reduxDispatch(init({wishlists: res}));
                }
            )
        } else {
            const value = wishLists.find(wishlist => wishlist.id === +id);
            setWishlist(value);
        }

    }, [wishLists]);


    return (
        wishlist && <div className="justify-center items-center flex flex-col mx-3 my-10">
            <h1 className="sm:text-4xl my-4">{wishlist?.title}</h1>
            <div className="w-full flex gap-4 flex-wrap justify-center sm:justify-start">
                <CreateWish wishlistId={id}/>
                {
                    wishlist?.wishes &&
                    wishlist?.wishes.map(wish =>
                        <WishItemCard
                            key={wish.id}
                            wishItem={wish}
                            selectWish={setEditWish}
                        />
                    )
                }
            </div>
            <ModalEditWish showModal={!!editWish} setShowModal={setEditWish} wish={editWish} wishlistId={id}/>
        </div>
    )
}
