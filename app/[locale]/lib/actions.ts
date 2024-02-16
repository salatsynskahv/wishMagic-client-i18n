'use server';

import {cookies, headers} from "next/headers";
import {parseJwt} from "@/components/services/Helpers";
import {config} from "@/components/Constants";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";


export async function getUser() {
    const token = cookies().get("token")?.value;
    if (!token) return null;
    return await parseJwt(token);
}

export async function getPath() {
    return headers().get('x-url');
}

export async function getUserWishlists() {
    const token = cookies().get("token")?.value;

    if (token) {
        const response = await fetch(`${config.url.API_BASE_URL}/api/wishlist`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeader(token)
            }
        });

        const res = await response.json();
        return res;
    }

    return undefined;
}

function authHeader(token: string) {
    return `Bearer ${token}`;
}


export async function logout() {

    const token = cookies().get("token")?.value;

    if (token) {
        const res = await fetch(`${config.url.API_BASE_URL}/logout`, {
            headers: {
                'Authorization': authHeader(token)
            }
        });

        if(res.ok) {
            cookies().delete('token');
            revalidatePath('/');
            redirect('/');
        }
    }
}