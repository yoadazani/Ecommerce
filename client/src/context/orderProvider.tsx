import React, {createContext, FC, ReactNode, useCallback, useMemo, useState} from "react";
import {IShoppingCartItem} from "../interfaces/IShoppingCartItem.interface";
import {useProducts} from "../hooks/useProducts";
import {IProducts} from "../interfaces/Iproducts.interface";
import {useShoppingCart} from "../hooks/useShoppingCart";
import {Spinner} from "@chakra-ui/react";
import {v4 as uuidV4} from "uuid";


interface IOrderProvider {
    amount: number,
    cartTotal: number
    orderList: IShoppingCartItem[],
    orderId: string
}

type TOrderProvider = {
    children: ReactNode
}

export const orderProvider = createContext({} as IOrderProvider)


export const OrderProvider: FC<TOrderProvider> = ({children }) => {

    const [orderId, setOrderId] = useState<string>('')
    const {productsArray} = useProducts()

    const {
        shoppingCartData,
        error,
        isError,
        isLoading,
        cartQuantity
    } = useShoppingCart()

    useMemo(() => {
        setOrderId(uuidV4())
    }, [])

    const cartTotal = useMemo(() => {
        return (shoppingCartData || []).reduce((totalCart: number, item: IShoppingCartItem) =>
            (item.isChecked ? item.quantity : 0) + totalCart, 0
        )
    }, [cartQuantity, shoppingCartData])

    const totalPrice = (shoppingCartData || []).reduce((total, cartItem) => {
        const item = productsArray?.find(
            (i: IProducts) => (i.id === cartItem.productID && cartItem.isChecked)
        )
        return total + (item?.price || 0) * cartItem.quantity
    }, 0)

    const orderList: IShoppingCartItem[] | undefined = useMemo(() => {
        return (shoppingCartData || []).filter((item: IShoppingCartItem) => item.isChecked)
    }, [cartTotal, totalPrice])


    if (isError) return <>{JSON.stringify(error)}</>
    if (isLoading) return <><Spinner/> Loading...</>
    return <orderProvider.Provider value={{
        amount: totalPrice,
        cartTotal,
        orderList,
        orderId
    }}>
        {children}
    </orderProvider.Provider>
}
