'use client'
import clsx from "clsx";
import Link from "next/link";
import ReactPopover from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/wishlist/popover";
import {BsThreeDotsVertical} from "react-icons/bs";
import React from "react";
import {redirect, useRouter} from "next/navigation";


const MenuButtonClient = ({wishlistId, children, url, path,} : {wishlistId: number, children: React.ReactNode, url: string, path: string | null}) => {
   const router = useRouter();
    const handleDeleteWishlist = () => {
        fetch('/api/wishlist', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({wishlistId})
        }).then(
            (res=> {
                router.push("/wishlist");
            })
        )
    }

    return (
        <>
            <div
                className={clsx("rounded-xl inline-flex mx-0.5 justify-center items-center cursor-pointer ",
                    {
                        'bg-gray-700 text-white': path === url,
                        'bg-indigo-100 bg-opacity-50': url !== path
                    })}>
                <Link className="px-4 py-2"

                    href={url}
                >
                    {children}

                    {/*<form action="deleteWishlist">*/}
                    {/*    <button*/}
                    {/*        className="three-dots-button">*/}
                    {/*        <BsThreeDotsVertical className="three-dots-icon"/>*/}
                    {/*    </button>*/}
                    {/*</form>*/}
                </Link>
                <ReactPopover
                    content={<>
                        <button className="three-dots-icon">Edit</button>
                        <button className="three-dots-icon" onClick={handleDeleteWishlist}>Delete</button>
                    </>
                    }
                >
                    <BsThreeDotsVertical className="three-dots-icon"/>
                </ReactPopover>

            </div>


        </>

    )

}

export default MenuButtonClient;