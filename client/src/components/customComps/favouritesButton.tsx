import React, {FC} from 'react';
import {Icon} from "@chakra-ui/icons";
import {IFavouritesButton} from "../../interfaces/IFavouritesButton.interface";
export const FavouritesButton: FC<IFavouritesButton> = ({icon, ...rest}) => {
    return <Icon {...rest} as={icon}/>
}