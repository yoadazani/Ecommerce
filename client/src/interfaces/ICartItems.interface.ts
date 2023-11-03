import {IShoppingCartItem} from "./IShoppingCartItem.interface";
import {BoxProps, TableContainerProps} from "@chakra-ui/react";

export interface ICartItems extends TableContainerProps{
    shoppingCartData: IShoppingCartItem[];
}