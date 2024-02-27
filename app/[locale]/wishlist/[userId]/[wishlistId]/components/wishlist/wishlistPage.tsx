'use client'

import {useState} from "react";
import {Wish} from "@/types/Wish";
import Wishlist from "@/types/Wishlist";
import WishCard from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/wish/wishCard";
import EditWishModal from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/modals/editWishModal";
import CreateWishCard from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/wish/createWishCard";

export default function WishlistPage({wishlist, userId}: { wishlist: Wishlist, userId: string }) {

    const [editWish, setEditWish] = useState<Wish>();
    const [wishlistState, setWishlistState] = useState<Wishlist>(wishlist);

    return (
        wishlist &&
        <div className="justify-center items-center flex flex-col p-2 mx-3">
            <div className="w-full wish-container">
                <CreateWishCard
                    wishlistId={wishlist.id}
                    setWishlist={setWishlistState}
                />
                {
                    wishlistState?.wishes &&
                    wishlistState?.wishes.map(wish =>
                        <WishCard
                            userId={userId}
                            key={wish.id}
                            wishItem={wish}
                            selectWish={setEditWish}
                            setWishlist={setWishlistState}
                        />
                    )
                }
            </div>
            <EditWishModal
                showModal={!!editWish}
                setShowModal={setEditWish}
                wish={editWish}
                setWishlist={setWishlistState}
                wishlistId={wishlist.id}/>
        </div>
    )
}
