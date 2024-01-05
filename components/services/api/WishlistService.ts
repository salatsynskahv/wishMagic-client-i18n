import {apiInstance, bearerAuth} from "@/components/services/api/AxiosInstance";
import {Wish} from "@/types/Wish";
import {AxiosResponse} from "axios";
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

export const getUserWishlist = async (): Promise<any> => {
    try {
        return  apiInstance.get('/api/wishlist', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': bearerAuth()
            }
        });
    } catch (error) {
        // Handle errors here
        throw error;
    }
};

