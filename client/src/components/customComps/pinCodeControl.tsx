import React, {Dispatch, FC, useDeferredValue, useEffect, useMemo, useState} from 'react';
import {Box, HStack, PinInput, PinInputField, Text, VStack} from "@chakra-ui/react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {confirmEmail} from "../../api/emailVerificationApi";
import {useLogin} from "../../hooks/useLogin";

type pinCodeControlProps = {
    userInfo: {
        email: string,
        pinCode: number
    }
}
export const PinCodeControl: FC<pinCodeControlProps> = ({userInfo}) => {

    const {usersData} = useLogin()
    const [pinCodeValue, setPinCodeValue] = useState<string>('')
    const deferredPinCodeValue = useDeferredValue(pinCodeValue)
    const navigate = useNavigate()

    const user = useMemo(() => {
        return usersData?.find(user => user.email === userInfo.email)
    }, [userInfo.email])

    useEffect(() => {
        if (
            deferredPinCodeValue.length === userInfo.pinCode.toString().length
            && deferredPinCodeValue === userInfo.pinCode.toString()
        ) {
            setTimeout(() => navigate(`/auth/reset-password?u=${user?.id}`), 1000)
        }
    }, [deferredPinCodeValue])

    const sendPinCode = async () => {
        await confirmEmail(userInfo)
        window.alert('we send you a pin code, please check your email address!')
    }

    return <VStack gap={8}>
        <VStack gap={1} textAlign={'center'}>
            <Text letterSpacing={0.8} fontWeight={'bold'} fontSize={'md'}>
                We send for you a pin code to your email address.
            </Text>
            <Text letterSpacing={1.1} fontSize={'sm'} color={'blackAlpha.500'}>
                Please enter your pin code below to confirm!
            </Text>
        </VStack>
        <HStack>
            <PinInput
                onChange={(e) => setPinCodeValue(e)}
                colorScheme={'twitter'}
                variant={'outline'}
            >
                <PinInputField borderColor={'twitter.700'}/>
                <PinInputField borderColor={'twitter.700'}/>
                <PinInputField borderColor={'twitter.700'}/>
                <PinInputField borderColor={'twitter.700'}/>
            </PinInput>
        </HStack>

        <HStack spacing={5}>
            <Text>You don`t get an email?</Text>
            <Text color={'blue'} onClick={sendPinCode}>Click here</Text>
        </HStack>
    </VStack>
}
