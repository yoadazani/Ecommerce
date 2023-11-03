import React, {FC, ReactNode} from 'react';
import {Text} from "@chakra-ui/react";

export const ErrorMassage: FC<any> = ({children}) => {
    return <Text color={'red'} fontSize={'16'}>
        {children}
    </Text>
};
