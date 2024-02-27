import createIntlMiddleware from 'next-intl/middleware';
import {type NextRequest, NextResponse} from 'next/server';
import {config as configConstants} from "@/components/Constants";
import {parseJwt} from "@/components/services/Helpers";

const locales = ['en', 'ua'];

const intlMiddleware = createIntlMiddleware({
    locales,
    localePrefix: 'as-needed',
    defaultLocale: 'en'
});


export default async function middleware(request: NextRequest) {

    const url = request.nextUrl.pathname;
    const response = intlMiddleware(request);

    if (url.includes('oauth2')) {
        setUserCookie(request.url, response);
    }

    response.headers.set('x-url', request.url);
    const accessTokenHeader = response.headers.get('x-middleware-request-cookie');
    console.log("accessTokenHeader");
    console.log(accessTokenHeader);
    if (accessTokenHeader) {
        const accessToken = getAccessToken(accessTokenHeader);
        if (accessToken) {
            const jwt = parseJwt(accessToken);
            const currentTimeStamp = Math.floor(Date.now() / 1000);

            if (currentTimeStamp > jwt.exp) {
                response.cookies.delete(configConstants.url.accessToken);

                const token = getToken(accessTokenHeader);
                if (token) {
                    console.log("refreshing token!!!");
                    console.log(token);

                    const refreshTokenResult = await fetch(`${configConstants.url.API_BASE_URL}/auth/refreshToken`, {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({token})
                    });


                    console.log(refreshTokenResult.statusText);

                    if (refreshTokenResult.ok) {
                        const newAccessTokenResponse = await refreshTokenResult.json();
                        console.log(accessToken)
                        response.cookies.set(configConstants.url.accessToken, newAccessTokenResponse.accessToken);
                    } else {
                        response.cookies.delete(configConstants.url.token);
                        NextResponse.redirect('http://localhost:3000/login');
                    }
                }
            }
        }
    }
    return response;

}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};

function setUserCookie(url: string, response: NextResponse) {
    if (url) {
        const accessToken = getAccessToken(url);
        if (accessToken) {
            response.cookies.set(configConstants.url.accessToken, accessToken);
        }
        const token = getToken(url);
        if (token) {
            response.cookies.set(configConstants.url.token, token);
        }
    }
}

function getAccessToken(text: string) {
    const accessTokenRegex = /accessToken=([^&]+)/;
    return parseRegex(text, accessTokenRegex);
}

function getToken(text: string) {
    const tokenRegex = /token=([^&]+)/;
    return parseRegex(text, tokenRegex);
}

function parseRegex(text: string, regex: RegExp) {
    const textMatch = text.match(regex);
    if (textMatch) {
        return textMatch[1];
    }
    return null;
}