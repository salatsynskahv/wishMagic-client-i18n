import React from "react";
import MenuButton from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/wishlist/menuButton";
import {
    CreateWishlistButton
} from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/wishlist/createWishlistButton";
import {getUserWishlists} from "@/app/[locale]/lib/actions";

export default async function Layout({params, children}: { params: { userId: string, wishlistId: string }, children: React.ReactNode }) {

    const wishlists = await getUserWishlists();

    return (
        <>
            <div className="m-3 flex justify-between">

                <div className="flex">
                    {
                        wishlists && wishlists.map(item =>

                            <MenuButton
                                key={item.id}
                                url={`/wishlist/${params.userId}/${item.id}`}
                                wishlistId={item.id}
                            >
                                {item.title}
                            </MenuButton>
                        )
                    }
                </div>
                <CreateWishlistButton/>

            </div>

            {children}

        </>
    )
}