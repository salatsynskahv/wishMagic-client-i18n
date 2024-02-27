import {cookies} from "next/headers";
import {config} from "@/components/Constants";
import {revalidatePath} from "next/cache";

export async function DELETE(req: any) {
    const token = getAccessToken();
    let reqJson = await req.json();

    console.log("reqJson.wishlistId: " + reqJson.wishlistId);

    if (token && reqJson) {
        const response = await fetch(`${config.url.API_BASE_URL}/api/wishlist/${reqJson.wishlistId}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeader(token)
            },
        });
        return Response.json({response});
    }

    revalidatePath("/wishlist")
    return new Response("delete");
}


export async function POST(req: any) {
    const token = getAccessToken();
    let reqJson = await req.json();

    console.log("reqJson : " + JSON.stringify(reqJson));

    if (token && reqJson) {
        console.log("post wishlist")
        const response = await fetch(`${config.url.API_BASE_URL}/api/wishlist`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeader(token)
            },
            body: JSON.stringify(reqJson)
        });
        const res = await response.json();
        console.log(res);
        return Response.json({response});
    }

    revalidatePath("/wishlist")
    return new Response("create wishlist");
}

function authHeader(token: string) {
    return `Bearer ${token}`;
}

function getAccessToken(){
    return cookies().get(config.url.accessToken)?.value;
}