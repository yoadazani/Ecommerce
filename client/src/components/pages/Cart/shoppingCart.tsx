import React, {FC} from 'react';
import {Box, Flex, Spinner, Stack} from "@chakra-ui/react";
import {CartTotalPrice} from "./cartTotalPrice";
import {EmptyCartMessage} from "./emptyCartMessage";
import {CartItemCard} from "./cartItemCard";
import {useShoppingCart} from "../../../hooks/useShoppingCart";
import {CartItems} from "./cartItems";
import {Checkout} from "./checkout";


export const ShoppingCart: FC = () => {

    const {
        shoppingCartData,
        error,
        isError,
        isLoading
    } = useShoppingCart()


    if (isError) return <>{JSON.stringify(error)}</>
    if (isLoading) return <><Spinner/> Loading...</>
    return <Stack
        direction={{base: 'column', md: 'row'}}
        align={'flex-start'}
        mx={"auto"}
        py={'4'}
        maxW={'95%'}
        maxH={'90vh'}
        overflow={"auto"}
        sx={{'::-webkit-scrollbar': {display: 'none'}}}
    >
        <CartItems
            shoppingCartData={shoppingCartData || []}
            maxW={'100%'}
            w={'full'}
        />
        <Checkout
            p={2}
            bg={'white'}
            w={'full'}
            rounded={'md'}
            maxW={{base: '100%', md: '400px'}}
            justify={'space-between'}
        />
    </Stack>
}
