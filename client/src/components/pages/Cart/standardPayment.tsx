import React from 'react';
import {Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export const StandardPayment = () => {

    const navigate = useNavigate()


    return <Button
        borderRadius={0}
        colorScheme={'blackAlpha'}
        bg={'blackAlpha.900'}
        onClick={() => navigate('/checkout')}
    >
        CHECKOUT
    </Button>
}
