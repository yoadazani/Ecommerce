import baseUrl from "./baseUrl";
import {IProducts} from "../interfaces/Iproducts.interface";


export const getProducts = async () :Promise<any> => {
    const response = await baseUrl.get("/products");
    return response.data
}

export const addProduct = async (product: IProducts) :Promise<any> => {
    const response = await baseUrl.post("/products", product);
    return response.data
}

export const updateProduct = async (product: IProducts) :Promise<any> => {
    const response = await baseUrl.put(`/products/${product.id}`, product);
    return response.data
}

export const deleteProduct = async (id: string) :Promise<any> => {
    const response = await baseUrl.delete(`/products/${id}`);
    return response.data
}