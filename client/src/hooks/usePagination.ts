import {useEffect, useState} from "react";

export const usePagination = (productsQuantity: number, perPage: number) => {
    const [pagesAmount, setPagesAmount] = useState<number[]>([]);

    useEffect(() => {
        if (productsQuantity) {
            let length = Math.ceil(productsQuantity / perPage)
            setPagesAmount(Array.from(Array(length).keys()))
        }
    }, [productsQuantity, perPage])

    return pagesAmount
}
