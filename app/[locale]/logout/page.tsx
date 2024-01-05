'use client';
import React, { useLayoutEffect} from "react";
import {useRouter} from "next/navigation";

import {useAuth} from "@/components/context/AuthContext";
import {serviceApi} from "@/components/services/api/ServiceApi";

export default function Logout(): React.JSX.Element {
    const router = useRouter();
    const {getUser} = useAuth();

    useLayoutEffect(() => {
        const user = getUser();
        serviceApi.logout(user).then(
            (result) => {
                console.log(result);
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        );
        // router.push("/");
    }, []);

    return (
        <div></div>
    )
}