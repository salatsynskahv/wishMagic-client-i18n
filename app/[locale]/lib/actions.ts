'use server';

import {cookies, headers} from "next/headers";
import {parseJwt} from "@/components/services/Helpers";
import {config} from "@/components/Constants";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import Wishlist from "@/types/Wishlist";

export async function getAccessToken() {
    return cookies().get(config.url.accessToken)?.value;
}

export async function getUser() {
    const token = await getAccessToken();
    console.log("token from cookies");
    console.log(token);
    if (!token) return null;
    return await parseJwt(token);
}

export async function getPath() {
    return headers().get('x-url');
}

export async function getUserWishlists(): Promise<Wishlist[]> {
    const token = await getAccessToken();

    if (token) {
        const response = await fetch(`${config.url.API_BASE_URL}/api/wishlist`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeader(token)
            }
        });

        const result = await response.json();

        if (response.ok) {
            return result;
        } else {
            throw new Error(result.message);
        }

    } else {
        redirect("/");
    }

}

export async function getUserWishlistById(id: any): Promise<Wishlist> {
    const token = await getAccessToken();

    if (token) {
        const response = await fetch(`${config.url.API_BASE_URL}/api/wishlist/${id}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeader(token)
            }
        });

        const result = await response.json();

        if (response.ok) {
            return result;
        } else {
            throw new Error(result.message);
        }

    } else {
        redirect("/");
    }

}

function authHeader(token: string) {
    return `Bearer ${token}`;
}


export async function logout() {

    const token = await getAccessToken();
    if (token) {
        const res = await fetch(`${config.url.API_BASE_URL}/logout`, {
            headers: {
                'Authorization': authHeader(token)
            }
        });

        cookies().delete(config.url.accessToken);
        cookies().delete(config.url.token);
        revalidatePath('/');
        redirect('/');

    }
}

// export async function deleteWish(wishId: Number) {
//     console.log("wishId : " + wishId);
//     const token = cookies().get("token")?.value;
//
//     if (token) {
//         const res = await fetch(`${config.url.API_BASE_URL}/api/wish/${wishId}`,
//             {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-type': 'application/json',
//                     'Authorization': authHeader(token)
//                 }
//             });
//
//         if(res.ok) {
//             revalidatePath('/wishlist/1/2');
//             redirect('/wishlist/1/2');
//         }
//     }
//
// }