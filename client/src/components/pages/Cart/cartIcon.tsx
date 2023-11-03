import React, {FC} from 'react';
import {Icon} from "@chakra-ui/icons";
import {AiOutlineShoppingCart} from "react-icons/all";

export const CartIcon: FC = () => {
    return <Icon fontSize={25} as={AiOutlineShoppingCart}/>
}
