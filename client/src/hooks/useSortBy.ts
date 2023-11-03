import {IProducts} from "../interfaces/Iproducts.interface";
import {IWishListItem} from "../interfaces/IWishList.interface";
import {useProducts} from "./useProducts";
import {ISpecificProduct} from "../interfaces/IspecificProduct.interface";

export const useSortBy = () => {
     const sortBy = (products: ISpecificProduct[], sortType: string) => {
        if (sortType === "Price Low To High") {
            return (products?.sort((a, b) => {
                return a.price - b.price
            }))
        } else if (sortType === "Price High To Low") {
            return (products?.sort((a, b) => {
                return b.price - a.price
            }))
        } else if (sortType === "Recently Added") {
            return (products?.sort((a, b) =>{
                return (new Date(a?.createdAt) > new Date(b?.createdAt)) ? -1 : 1
            }))
        } else if (sortType === "Recommended") {
            return (products.sort((a, b) => {
                return (Number(a?.reviews.length) > Number(b?.reviews.length)) ? -1 : 1
            }))
        }
    }

    return {sortBy}
}


