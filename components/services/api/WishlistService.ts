import {apiInstance, bearerAuth, bearerAuthWithUser} from "@/components/services/api/AxiosInstance";
import {Wish} from "@/types/Wish";
import Wishlist from "@/types/Wishlist";

export const createWishlistItem = async (wishItem : Wish) => {
    const result = await apiInstance.post('/api/wishItem', wishItem,{
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth()
        }
    });
    console.log(result);
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


