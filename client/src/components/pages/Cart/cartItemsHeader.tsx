import {ChangeEvent, FC, useEffect, useMemo, useState} from 'react';
import {Checkbox, Heading, Stack} from "@chakra-ui/react";
import {useShoppingCart} from "../../../hooks/useShoppingCart";
import {IShoppingCartItem} from "../../../interfaces/IShoppingCartItem.interface";


type TShoppingCartData = {
    shoppingCartData: IShoppingCartItem[]
}
export const CartItemsHeader: FC<TShoppingCartData> = ({shoppingCartData}) => {

    const {updateAllCartItems} = useShoppingCart();
    const handleCheckAll = async (e: ChangeEvent<HTMLInputElement>) => {
        updateAllCartItems(shoppingCartData?.map(item => ({
            ...item,
            isChecked: e.target.checked
        })) as IShoppingCartItem[])
    }

    const allChecked = useMemo(() =>
        shoppingCartData?.every(item => item.isChecked
        ), [shoppingCartData])

    return <Stack p={2} spacing={2} rounded={'md'} bg={'white'} mb={2}>
        <Heading w={'50%'} fontSize={20}>Shopping cart</Heading>
        <Checkbox
            w={'45%'}
            isChecked={allChecked}
            onChange={handleCheckAll}
        >
            Select all
        </Checkbox>
    </Stack>
}
