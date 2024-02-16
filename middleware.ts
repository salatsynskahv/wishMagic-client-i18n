import createIntlMiddleware from 'next-intl/middleware';
import {type NextRequest, NextResponse} from 'next/server';
import {cookies} from "next/headers";
import {parseJwt} from "@/components/services/Helpers";

const locales = ['en', 'de'];
const publicPages = ['/', '/login'];

const intlMiddleware = createIntlMiddleware({
    locales,
    localePrefix: 'as-needed',
    defaultLocale: 'en'
});


export default function middleware(request: NextRequest) {

    const url = request.nextUrl.pathname;
    const result = intlMiddleware(request);

    if (url.includes('oauth2')) {
        setUserCookie(request.url, result);
    }
    result.headers.set('x-url', request.url);
    return result;

}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};

function setUserCookie(url: string, response: NextResponse) {
    const tokenRegex = /token=([^&]+)/;

    if (url) {
        const tokenMatch = url.match(tokenRegex);
        if (tokenMatch) {
            // Extract token value from the matched group
            const token = tokenMatch[1];
            response.cookies.set("token", token);
        } else {
            console.log("Token not found in URL");
        }
    }
}