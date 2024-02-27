import {cookies} from "next/headers";
import {config} from "@/components/Constants";


export async function POST(req: any, {params} : any) {
    const token = getAccessToken();
    let wish = await req.json();
    console.log(wish);

    if (token && wish) {
        const response = await fetch(`${config.url.API_BASE_URL}/api/wish`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeader(token)
            },
            body: JSON.stringify(wish.wish)
        });

        const res = await response.json();
        console.log(res);
        return Response.json({res});

    }
    return new Response("post");
}

export async function PATCH(req: any, {params} : any) {
    const token = getAccessToken();
    let wish = await req.json();

    if (token && wish) {
        const response = await fetch(`${config.url.API_BASE_URL}/api/wish`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeader(token)
            },
            body: JSON.stringify(wish.wish)
        });

        const res = await response.json();
        return Response.json({...res});

    }
    return new Response("patch");
}

export async function DELETE(req: any) {
    const token = getAccessToken();
    let reqJson = await req.json();

    if (token && reqJson) {
        const response = await fetch(`${config.url.API_BASE_URL}/api/wish/${reqJson.wishId}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeader(token)
            },
        });
        return Response.json({response});
    }

    return new Response("delete");
}

export async function GET() {
    return new Response("get result");
}



function authHeader(token: string) {
    return `Bearer ${token}`;
}

function getAccessToken(){
    return cookies().get(config.url.accessToken)?.value;
}