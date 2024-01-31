import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import Wishlist from "@/types/Wishlist";
import {config} from "@/components/Constants";
import {bearerAuth} from "@/components/services/api/AxiosInstance";

const baseQueryWithHeaders = fetchBaseQuery({
    baseUrl: config.url.API_BASE_URL,
    headers: {
        'Content-type': 'application/json',
        'Authorization': bearerAuth()
    },
});

export const wishlistApi = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: baseQueryWithHeaders,
    endpoints: (builder) => ({
        getWishlists: builder.query<Wishlist, string>({
            query: () => `/api/wishlist`,
        }),
    }),
})

// @ts-ignore
 export const {useGetWishlistsQuery} = wishlistApi;