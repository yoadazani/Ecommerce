import React, {createContext, Dispatch, FC, useState} from 'react';
import {usePagination} from "../hooks/usePagination";

interface IPaginationProvider {
    currentPage: number
    setCurrentPage: Dispatch<number>
    limit: number
    setLimit: Dispatch<number>
    indexOfLastProduct: number
    indexOfFirstProduct: number
    paginatedProductAmounts: number[]
    productsQuantity: number
}
export const paginationProvider = createContext({} as IPaginationProvider)

type Props = {
    productsQuantity: number,
    children: React.ReactNode
}
export const PaginationProvider: FC<Props> = ({children, productsQuantity}) => {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(50)
    const indexOfLastProduct = currentPage * limit
    const indexOfFirstProduct = indexOfLastProduct - limit
    const paginatedProductAmounts = usePagination((productsQuantity || 0), limit)


    return <paginationProvider.Provider value={{
        currentPage,
        setCurrentPage,
        limit,
        setLimit,
        indexOfLastProduct,
        indexOfFirstProduct,
        paginatedProductAmounts,
        productsQuantity
    }}>
        {children}
    </paginationProvider.Provider>
}