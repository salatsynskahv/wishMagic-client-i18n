import clsx from "clsx";
import Link from "next/link";
import React from "react";
import {BsThreeDotsVertical} from "react-icons/bs";
import {getPath} from "@/app/[locale]/lib/actions";
import {config} from "@/components/Constants";

export default async function MenuButton({url, children}: { url: string, children: React.ReactNode }) {
    let path = await getPath();
    if(path) {
        let startIndex = path.indexOf("wishlist/");
        if (startIndex !== -1) {
            path = path.substring(startIndex-1);
        }
    }
    return (

        <Link
            className={clsx("px-6 py-3 rounded-t-2xl  justify-center items-center gap-1 inline-flex cursor-pointer",
                {
                    'bg-indigo-100': path === url,
                    'bg-indigo-50 bg-opacity-50': url !== path
                })}
            href={url}
        >
            {children}
            <form action="deleteWishlist">
                <button><BsThreeDotsVertical/></button>
            </form>
        </Link>
    )
}