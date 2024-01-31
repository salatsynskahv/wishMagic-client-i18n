'use client';
import React, { useLayoutEffect} from "react";
import {useRouter} from "next/navigation";

import {useAuth} from "@/components/context/AuthContext";
import {serviceApi} from "@/components/services/api/ServiceApi";

export default function Logout(): React.JSX.Element {
    const {getUser} = useAuth();

    useLayoutEffect(() => {
        const user = getUser();
        serviceApi.logout(user).then(
            (result) => {
            }
        ).catch(
            (error) => {
            }
        );
        // router.push("/");
    }, []);

    return (
        <div></div>
    )
}