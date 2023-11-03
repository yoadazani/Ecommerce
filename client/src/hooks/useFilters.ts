import {IProducts} from "../interfaces/Iproducts.interface";
import {useMemo, useState} from "react";
import {useSortBy} from "./useSortBy";

type queryParams = {
    [key: string]: string
}
export const useFilters = (data: IProducts[], query: string) => {
    let filters: queryParams = {}
    const searchParams = new URLSearchParams(query)
    const {sortBy} = useSortBy()

    for (const [key, value] of searchParams.entries()) {
        filters[key] = value
    }

    return useMemo(() => {
        if (Object.keys(filters).length === 0) {
            return data;
        }

        const {...args} = filters;

        let products = data.filter((product) =>
            (!args?.categoryID || product.categoryID === args?.categoryID) &&
            (!args?.search || product.productName.toLowerCase().includes(args?.search.toLowerCase())) &&
            (!args?.inStock || product.inStock === Boolean(parseInt(args?.inStock))) &&
            (!args?.minPrice || product.price >= parseFloat(args?.minPrice)) &&
            (!args?.maxPrice || product.price <= parseFloat(args?.maxPrice)) &&
            (!args?.colors || product.colors?.some(c => args?.colors.includes(c))) &&
            (!args?.sizes || product.sizes?.some(s => args?.sizes.includes(s))) &&
            (!args?.rating || product.rating === parseInt(args?.rating))
        );
        sortBy(products, args?.sortBy)
        return products
    }, [data, filters])
}
