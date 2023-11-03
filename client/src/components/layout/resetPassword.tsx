import React from 'react';
import {Box, Button, FormControl, Heading, Input} from "@chakra-ui/react";
import {useFormik} from "formik";
import {ErrorMassage} from "../customComps/errorMassage";
import {ResetPasswordSchema} from "../../schemes/ResetPasswordSchema";
import {useLogin} from "../../hooks/useLogin";
import {useQueryString} from "../../hooks/useQueryString";
import {IUser} from "../../interfaces/IUser.interface";
import {useToastMessages} from "../../hooks/useToastMessages";
import {useNavigate} from "react-router-dom";
import {PageBreadcrumb} from "../customComps/pageBreadcrumb";

export const ResetPassword = () => {


    const {query} = useQueryString()
    const navigate = useNavigate()
    const {ErrorToast, SuccessToast} = useToastMessages()
    const {updateSpecificUser} = useLogin()
    const {usersData} = useLogin()
    const initialValues = {
        newPassword: "",
        confirmPassword: ""
    }

    const onSubmit = async () => {
        const user = usersData?.find(user => user.id === query.get('u'))
        const newUserData = {
            ...user,
            password: values.newPassword
        }
        if (user) {
            await updateSpecificUser(newUserData as IUser)
            SuccessToast("Password changed successfully")
            setTimeout(() => {
                navigate('/auth/login')
            }, 2000)

        } else {
            ErrorToast("User not found")
        }
        resetForm()
    }

    const {
        handleSubmit,
        getFieldProps,
        values,
        errors,
        touched,
        resetForm
    } = useFormik({
        initialValues,
        validationSchema: ResetPasswordSchema,
        onSubmit
    })

    return <>
        <PageBreadcrumb title={'auth / Reset-password'}/>
        <Box bg={"white"} maxW={'500px'} w={'full'} mx={'auto'} my={5} py={5} px={5} boxShadow={'2xl'}>
            <Heading fontSize={24} mb={3} textAlign='center'>Reset your password</Heading>
            <FormControl>
                <form onSubmit={handleSubmit}>
                    <FormControl mb={3}>
                        <Input
                            w='full'
                            type='text'
                            placeholder='New password'
                            {...getFieldProps('newPassword')}
                        />
                        {errors.newPassword && touched.newPassword && <ErrorMassage children={errors.newPassword}/>}
                    </FormControl>
                    <FormControl mb={3}>
                        <Input
                            w='full'
                            type='text'
                            placeholder='Confirm password'
                            {...getFieldProps('confirmPassword')}
                        />
                        {errors.confirmPassword && touched.confirmPassword &&
                            <ErrorMassage children={errors.confirmPassword}/>}
                    </FormControl>

                    <FormControl w='30%' mx={'auto'} mt={5}>
                        <Button
                            colorScheme={'black'}
                            color={'beige'}
                            bg={'#131928'}
                            w={'full'}
                            mx={'auto'}
                            rounded={'full'}
                            type='submit'
                        >
                            Reset password
                        </Button>
                    </FormControl>
                </form>
            </FormControl>
        </Box>
    </>
}
