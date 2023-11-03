import React from 'react';
import {Box, Divider, Text} from "@chakra-ui/react";

export const DecisionDivider = () => {
    return <Box pos={'relative'}>
        <Divider borderColor={'blackAlpha.900'}/>
        <Box pos={'absolute'}
             left={'47%'}
             bottom={'-14px'}
             p={1}
             bg={'white'}
        >
            <Text
                fontWeight={'bold'}
            >
                OR
            </Text>
        </Box>
    </Box>
}
