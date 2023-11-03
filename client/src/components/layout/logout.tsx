import React, {FC} from 'react';
import {HStack, Spacer, Stack, StackProps, Text} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {FiLogOut} from "react-icons/all";

export const Logout:FC<StackProps> = ({...rest}) => {
    return (
        <HStack {...rest}>
            <Text>Logout</Text>
            <Spacer/>
            <Icon as={FiLogOut}  color={'red'} />
        </HStack>
    );
}
