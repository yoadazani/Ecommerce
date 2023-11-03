import React, {FC} from 'react';
import {Button} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {FcGoogle} from "react-icons/all";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import {useLogin} from "../../hooks/useLogin";
import {v4 as uuidV4} from "uuid";
import {IUser} from "../../interfaces/IUser.interface";
import {useToastMessages} from "../../hooks/useToastMessages";

export const GoogleAuth: FC<{onClose?: () => void}> = ({onClose}) => {

    const {register, usersData} = useLogin()
    const {SuccessToast, ErrorToast} = useToastMessages()

    const initialValues: IUser = {
        id: uuidV4(),
        provider: "google",
        userName: "",
        email: "",
        phone: "",
        password: "",
        role: "user",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        address: []
    }
    const onSuccess = async (accessToken: any) => {
        const res = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${accessToken.access_token}`
                }
            })
        initialValues.email = res.data.email
        initialValues.userName = res.data.name
        register(initialValues)
        return SuccessToast("Logged in successfully")
    }

    const onError = (error: any) => {
        return ErrorToast(error.message)
    }


    const login = useGoogleLogin({onSuccess, onError})

    return <Button
        w={'50%'}
        size={'sm'}
        mx={'auto'}
        rounded={'full'}
        colorScheme={'blackAlpha'}
        variant={'outline'}
        onClick={() => {
            login()
            onClose?.()
        }}
        leftIcon={<Icon as={FcGoogle} fontSize={26}/>}
    >
        Continue with google
    </Button>
}
