import HeaderClient from "@/components/header/headerClient";
import {getUser, logout} from "@/app/[locale]/lib/actions";
import React from "react";

export default async function Header()  {
    const user = await getUser();

    return (
        <HeaderClient user={user}>
            <form action={logout} className="inline-block">
                <button className="text-white text-xl font-normal font-['Inter']">
                    Log out
                </button>
            </form>

        </HeaderClient>
    )
}
