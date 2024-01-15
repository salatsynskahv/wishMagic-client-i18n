'use client'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from "@/components/context/AuthContext";
import {parseJwt} from "@/components/services/Helpers";
import {useRouter, useSearchParams} from "next/navigation";

function OAuth2Redirect(): React.ReactNode {
    const { userLogin } = useContext(AuthContext);
    const router = useRouter();
    const [redirectTo, setRedirectTo] = useState('/login')

    const searchParams = useSearchParams()

    useEffect(() => {
        const accessToken = extractUrlParameter('token');
        // console.log(accessToken);
        if (accessToken) {
            handleLogin(accessToken)
            const redirect = '/'
            setRedirectTo(redirect)
        }
    }, []);


    useEffect(() => {
        if (redirectTo) {
            router.push(redirectTo);
        }
    }, [redirectTo]);

    const extractUrlParameter = (key: string) => {
        return searchParams.get(key);
    }

    const handleLogin = (accessToken: string) => {
        const data = parseJwt(accessToken)
        const user = { data, accessToken }
        userLogin(user)
    };

    return null;
}

export default OAuth2Redirect