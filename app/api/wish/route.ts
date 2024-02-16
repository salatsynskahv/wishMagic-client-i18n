import {cookies} from "next/headers";
import {config} from "@/components/Constants";
import {revalidatePath} from "next/cache";

export async function PATCH(req: any, {params} : any) {
    const token = cookies().get("token")?.value;
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
        return Response.json({res});

    }
    return new Response("patch");
}

export async function GET() {
    return new Response("get result");
}

function authHeader(token: string) {
    return `Bearer ${token}`;
}