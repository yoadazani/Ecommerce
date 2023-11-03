import React, {FC} from "react";
import {IShoppingCartItem} from "../../../interfaces/IShoppingCartItem.interface";
import {Box, HStack} from "@chakra-ui/react";
import {useShoppingCart} from "../../../hooks/useShoppingCart";

type TIncreaseAndDecrease = {
    cartItem: IShoppingCartItem
}
export const IncreaseAndDecrease: FC<TIncreaseAndDecrease> = ({cartItem}) => {

    const {
        addToCart,
        updateCartItem
    } = useShoppingCart()

    return <HStack borderWidth={1}>
        <Box
            bg={'blackAlpha.400'}
            w={5}
            textAlign={'center'}
            cursor={"pointer"}
            onClick={() => updateCartItem({
                ...cartItem,
                quantity: cartItem.quantity - 1
            })}
        >
            -
        </Box>
        <Box>{cartItem.quantity}</Box>
        <Box
            bg={'blackAlpha.400'}
            textAlign={'center'}
            w={5}
            cursor={"pointer"}
            onClick={() => addToCart(cartItem)}
        >
            +
        </Box>
    </HStack>
}
