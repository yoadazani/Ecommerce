import React from 'react';
import {Box, Button, Heading, Stack, Text, VStack} from "@chakra-ui/react";
import {BiCheck} from 'react-icons/all'
import {Icon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {useQueryString} from "../../../hooks/useQueryString";

export const PaymentSucceeded = () => {

    const navigate = useNavigate()
    const {query} = useQueryString()

    return <Box mx={'auto'} maxW={'650px'} w={"full"} bg={'white'} shadow={'2xl'} my={5} py={5}>
        <VStack gap={5}>
            <Stack align={'center'}>
                <VStack justify={'center'} rounded={'full'} w={50} h={50} bg={'green.500'}>
                    <Icon as={BiCheck} fontSize={45} color={'white'}/>
                </VStack>
                <Heading bgClip='text' bgGradient={'linear(to-r, green.500, green.300)'}>
                    payment Succeeded!
                </Heading>
                <Text letterSpacing={.8} fontWeight={'bold'} color={'blackAlpha.700'}>
                    Thank you for your purchase !
                </Text>
            </Stack>
            <Text letterSpacing={.8} color={'blackAlpha.500'} fontWeight={'semibold'}>
                Order_Number: {query.get('orderId')}
            </Text>

            <Button
                onClick={() => navigate('/store')}
                colorScheme={'black'}
                color={'beige'}
                bg={'#131928'}
                w={'50%'}
                mx={'auto'}
                rounded={'full'}
            >
                Back to store
            </Button>
        </VStack>
    </Box>
}
