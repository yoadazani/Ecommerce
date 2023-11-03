import React, {FC, useContext, useEffect, useState} from 'react';
import {Box, Text} from "@chakra-ui/react";
import {orderProvider} from "../../../context/orderProvider";
import {Elements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js";
import {StripeForm} from "./stripeForm";
import axios from "axios";


const stripePromise = loadStripe("pk_test_51NPlisJ2tgeUZLVsxT8tMj2Kxe9waGvC9jVzDwkuNeGm1fzzvnGYJmMeEIgIcHUwDk11Jn3DWhts0fuhdHsETC8g00p6IMRaXB");

export const Payment: FC = () => {

    const {amount, orderId} = useContext(orderProvider)

    const [clientSecret, setClientSecret] = useState("");

    const getClientSecret = async () =>{
        const res = await axios.post("https://127.0.0.1:3000/create-payment-intent", {amount: amount * 100})
        setClientSecret(res.data.clientSecret)
    }

    useEffect(() => {
        getClientSecret().then();
    }, []);

    const Appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        Appearance,
    };

    return <Box bg={"white"} maxW={'500px'} w={'full'} mx={'auto'} my={5} py={5} px={5} boxShadow={'2xl'}>
        <Text>total price: ${amount?.toFixed(2)}</Text>

        {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
                <StripeForm/>
            </Elements>
        )}
    </Box>
}
