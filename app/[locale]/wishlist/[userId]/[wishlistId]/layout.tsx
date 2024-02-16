
import React from "react";
import clsx from "clsx";
import {config} from "@/components/Constants";
import Wishlist from "@/types/Wishlist";
import MenuButton from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/wishlist/menuButton";

export default async function Layout({params, children}: {params: {userId: string, wishlistId: string}, children: React.ReactNode }) {

        const res = await fetch(`${config.url.API_BASE_URL}/api/wishlist/test`);
        const wishlists: Wishlist[] = await res.json();

    return (
        <>
            <div className={clsx("flex flex-col my-10 mx-6"
                )}>
                {/*<h1 className="text-4xl text-center">{t("my_wishlists")} </h1>*/}
                <div className="flex gap-1 mx-3">

                    {
                        wishlists && wishlists.map(item =>

                        <MenuButton
                            key={item.id}
                            url={`/wishlist/${params.userId}/${item.id}`}>
                            {item.title}
                        </MenuButton>
                          )
                    }
                    {/*<CreateWishlistButton/>*/}

                </div>

                {children}
            </div>

        </>
    )
}