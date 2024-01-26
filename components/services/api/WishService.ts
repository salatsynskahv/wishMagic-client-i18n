import {apiInstance, bearerAuth, bearerAuthWithUser} from "@/components/services/api/AxiosInstance";
import {AxiosResponse} from "axios";

export const getAllWishesByWishlistId = async (wishlistId: number): Promise<AxiosResponse<any>> => {

    const result = await apiInstance.get("/api/wishItem/byWishlist", {
        params: {wishlistId},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth()
        }
    });
    return result;
}

export const likeWishRequest = async (wishId: number| undefined, userId: string): Promise<AxiosResponse<any>> => {

    return await apiInstance.post("/api/likes",
        {wishId, userId},
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': bearerAuth()
            }
        }
    );
}

export const disLikeWishRequest = async (likeId: number): Promise<AxiosResponse<any>> => {
    return await apiInstance.delete(`/api/likes/${likeId}`,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': bearerAuth()
            }
        }
    );
}

