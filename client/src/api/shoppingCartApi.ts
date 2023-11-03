import baseUrl from "./baseUrl";
import {IShoppingCartItem} from "../interfaces/IShoppingCartItem.interface";

export const getSoppingCartItems = async (userID: string): Promise<IShoppingCartItem[]> => {
    const response = await baseUrl.get('/shoppingCart?userID=' + userID);
    return response.data
}

export const addToSoppingCartItems = async (item: IShoppingCartItem): Promise<IShoppingCartItem | undefined> => {
    try {
        const newItem = await baseUrl.post('/shoppingCart', item);
        return newItem.data
    } catch (e: Error | any) {
        console.log(e?.message)
    }
}

export const updateSoppingCartItems = async (item: IShoppingCartItem): Promise<IShoppingCartItem> => {
    const response = await baseUrl.put(`/shoppingCart/${item.id}`, item);
    return response.data
}

export const updateAllSoppingCartItems = async (items: IShoppingCartItem[]): Promise<IShoppingCartItem[]> => {
    const response = await baseUrl.put('/shoppingCart/all', items);
    return response.data
}

export const deleteSoppingCartItems = async (id: string): Promise<IShoppingCartItem> => {
    const response = await baseUrl.delete(`/shoppingCart/${id}`);
    return response.data
}
