import {BoxProps, HStack, Spacer, Text} from "@chakra-ui/react";
import React, {FC, useCallback, useContext, useMemo} from "react";
import {paginationProvider} from "../../../context/paginationProvider";
import {SortBy} from "../../customComps/sortBy";


export const StoreHeader: FC<BoxProps> = ({...rest}) => {
    const {productsQuantity} = useContext(paginationProvider)

    return <HStack {...rest} >
        <Text as={'span'} fontSize={'smaller'} fontWeight={"medium"}>Sort by</Text>
        <SortBy/>
        <Spacer/>
        <HStack spacing={1}>
            <Text as={"span"} fontSize={'md'} fontWeight={"medium"}>{productsQuantity}</Text>
            <Text as={'span'} fontSize={'smaller'}>products</Text>
        </HStack>
    </HStack>
}
