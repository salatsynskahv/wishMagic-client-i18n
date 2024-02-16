import {apiInstance, bearerAuth} from "@/components/services/api/AxiosInstance";
import {Wish} from "@/types/Wish";
import Wishlist from "@/types/Wishlist";

export const createWishRequest = (wishItem : Wish) => {
    return  apiInstance.post('/api/wishItem', wishItem,{
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth()
        }
    });
}

export const createWishlistRequest = async (wishlist : any) => {
    return await apiInstance.post('/api/wishlist', wishlist, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth()
        }
    });
}

export const updateWishRequest =  (wishItem : Wish) => {
   return apiInstance.patch('/api/wishItem', wishItem,{
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth()
        }
    });
}

export const getUserWishlistFetcher =  () =>
    apiInstance.get('/api/wishlist', {
        headers: {
                'Content-type': 'application/json',
                'Authorization': bearerAuth()
            }
    }).then(res => res.data);



export const getUserWishlistByIdFetcher = (url: any) =>
    apiInstance.get(url, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth()
        }
    }).then(res => res.data);


