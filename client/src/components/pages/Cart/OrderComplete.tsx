import React from 'react';
import {Box, Button, Heading} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export const OrderComplete = () => {

    const navigate = useNavigate();

    return <Box textAlign={'center'} bg={"white"} maxW={'500px'} w={'full'} mx={'auto'} my={5} py={5} px={5} boxShadow={'2xl'}>
        <Heading color={"greenyellow"} my={3}>
            Order Complete
        </Heading>
        <Button
        colorScheme={'black'}
        color={'beige'}
        bg={'#131928'}
        w={'full'}
        mx={'auto'}
        rounded={'full'}
        type='submit'
        onClick={() => navigate('/store')}
    >
        Back to Store
    </Button>
    </Box>
}
