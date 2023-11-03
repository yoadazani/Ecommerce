import React, {Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {Box, Divider, HStack, Text} from "@chakra-ui/react";
import {Information} from "./information";
import {Payment} from "./payment";
import {PageBreadcrumb} from "../../customComps/pageBreadcrumb";
import {OrderProvider} from "../../../context/orderProvider";

export interface followSteps {
    setStep: Dispatch<SetStateAction<number>>;
}

export const StripePayment = () => {

    const [step, setStep] = useState(1)

    return <OrderProvider>
        <PageBreadcrumb title={'checkout'}/>
        <Box w={'full'} maxW={'500px'} color={'blackAlpha.500'} fontSize={18} mx={"auto"} py={5}>
            <HStack spacing={0.5} px={'20%'}>
                <Text color={(step >= 1) ? "black" : "blackAlpha.500"}>
                    information
                </Text>
                <Divider borderColor={(step > 1) ? "black" : "blackAlpha.500"} borderWidth={1.2}/>
                <Text color={(step >= 2) ? "black" : "blackAlpha.500"}>
                    payment
                </Text>
            </HStack>

            {step === 1 && <Information setStep={setStep}/>}

            {step === 2 && <Payment/>}
        </Box>
    </OrderProvider>
}
