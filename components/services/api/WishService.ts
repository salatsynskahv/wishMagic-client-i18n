
import {apiInstance, bearerAuth} from "@/components/services/api/AxiosInstance";
import {AxiosResponse} from "axios";

export const getAllWishesByWishlistId = async ( wishlistId: number) : Promise<AxiosResponse<any>> => {

    const result = await apiInstance.get("/api/wishItem/byWishlist", {
        params: {wishlistId},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth()
        }
    });
    return  result;
}

