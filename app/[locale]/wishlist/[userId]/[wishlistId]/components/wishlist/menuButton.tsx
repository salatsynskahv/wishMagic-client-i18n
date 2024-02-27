import React from "react";
import {getPath} from "@/app/[locale]/lib/actions";
import MenuButtonClient from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/wishlist/menuButtonClient";

export default async function MenuButton({url, children, wishlistId}: {
    url: string,
    children: React.ReactNode,
    wishlistId: number
}) {
    let path = await getPath();
    if (path) {
        let startIndex = path.indexOf("wishlist/");
        if (startIndex !== -1) {
            path = path.substring(startIndex - 1);
        }
    }

    return (
        <MenuButtonClient
            url={url}
            path={path}
            wishlistId={wishlistId}
        >
            {children}
        </MenuButtonClient>
    )
}