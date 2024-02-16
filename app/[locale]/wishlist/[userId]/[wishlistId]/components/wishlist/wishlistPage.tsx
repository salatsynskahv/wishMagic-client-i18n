'use client'
import Wishlist from "@/types/Wishlist";
import {WishCard} from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/wish/wishCard";
import ModalEditWish from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/modals/modalEditWish";
import {createContext, useState} from "react";
import {Wish} from "@/types/Wish";

const WishlistContext = createContext(null);
export default function WishlistPage({wishlist, userId}: { wishlist: Wishlist, userId:string }) {

    const [editWish, setEditWish] = useState<Wish | null>(null);
    const [wishlistState, setWishlistState] = useState<Wishlist>(wishlist);


    return (
        wishlist &&
        <div className="justify-center items-center flex flex-col p-2 mx-3 bg-indigo-100">
            <div className="w-full wish-container">
                {/*<CreateWish wishlistId={wishlist.id}/>*/}
                {
                    wishlistState?.wishes &&
                    wishlistState?.wishes.map(wish =>
                        <WishCard
                            userId={userId}
                            key={wish.id}
                            wishItem={wish}
                            selectWish={setEditWish}
                            setWishlist = {setWishlistState}
                        />
                    )
                }
            </div>
            <ModalEditWish
                showModal={!!editWish}
                setShowModal={setEditWish}
                wish={editWish}
                setWishlist = {setWishlistState}
                wishlistId={wishlist.id}/>
        </div>
    )
}
