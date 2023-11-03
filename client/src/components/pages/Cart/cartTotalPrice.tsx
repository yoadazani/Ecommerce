import React, {FC, useContext} from 'react';
import {HStack, Stack, StackProps, Text} from "@chakra-ui/react";
import {orderProvider} from "../../../context/orderProvider";

export const CartTotalPrice: FC<StackProps> = ({...rest}) => {

    const {cartTotal, amount} = useContext(orderProvider)

    return <Stack gap={2} pt={2} {...rest}>
        <HStack justify={"space-between"}>
            <HStack>
                <Text fontWeight={"bold"}>
                    Cart Total:
                </Text>
                <Text color={"blackAlpha.500"}>({cartTotal} items)</Text>
            </HStack>
            <Text
                fontWeight={"bold"}
                fontSize={20}
            >
                {amount.toFixed(2)}
            </Text>
        </HStack>
    </Stack>
}
