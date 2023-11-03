import React, {FC} from 'react';
import {Box, Stack} from "@chakra-ui/react";
import {ICartItems} from "../../../interfaces/ICartItems.interface";
import {CartItemCard} from "./cartItemCard";
import {EmptyCartMessage} from "./emptyCartMessage";
import {CartItemsHeader} from "./cartItemsHeader";

export const CartItems: FC<ICartItems> = ({shoppingCartData, ...rest}) => {


    return <Box {...rest}>
        {shoppingCartData.length > 0 && <CartItemsHeader shoppingCartData={shoppingCartData}/>}
        <Stack bg={"white"} rounded={'md'} py={2}>
            {(shoppingCartData || []).length > 0
                ? shoppingCartData?.map(item => {
                    return <CartItemCard
                        key={item.id}
                        item={item}
                    />
                })
                : <EmptyCartMessage/>
            }
        </Stack>
    </Box>
}
