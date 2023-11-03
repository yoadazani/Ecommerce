import baseUrl from "./baseUrl";
import {IWishListItem} from "../interfaces/IWishList.interface";


export const getWishList = async (userID: string): Promise<IWishListItem[]> => {
    const response = await baseUrl.get("/wishlist?userID=" + userID);
    return response.data
}

export const addWishListItem = async (product: IWishListItem): Promise<IWishListItem | undefined> => {
    try {
        const response = await baseUrl.post("/wishList", product);
        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const updateWishListItem = async (product: IWishListItem): Promise<IWishListItem> => {
    const response = await baseUrl.put(`/wishList/${product.id}`, product);
    return response.data
}

export const deleteWishListItem = async (item: IWishListItem): Promise<any> => {
    const response = await baseUrl.delete(`/wishList/${item.id}`);
    return response.data
}
