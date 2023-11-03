import React, {FC, useState} from "react";
import {useFormik} from "formik";
import {confirmEmailSchema} from "../../schemes/confirmEmailSchema";
import {
    Box,
    Button,
    FormControl,
    Heading,
    Input
} from "@chakra-ui/react";
import {PinCodeControl} from "../customComps/pinCodeControl";
import {confirmEmail} from "../../api/emailVerificationApi";
import {useLogin} from "../../hooks/useLogin";
import {useToastMessages} from "../../hooks/useToastMessages";
import {ErrorMassage} from "../customComps/errorMassage";
import {PageBreadcrumb} from "../customComps/pageBreadcrumb";

export const EmailVerification: FC = () => {


    const {ErrorToast} = useToastMessages()
    const {usersData} = useLogin()
    const [flag, setFlag] = useState<boolean>(false)
    const initialValues = {
        email: "",
        pinCode: Math.floor(1000 + Math.random() * 9000)
    }

    const onSubmit = async () => {
        const user = usersData?.find(user => user.email === values.email)
        if (user) {
            setFlag(true)
            await confirmEmail(values)
        }
        ErrorToast("Email not found")
    }

    const {
        handleSubmit,
        getFieldProps,
        values,
        errors,
        touched
    } = useFormik({
        initialValues,
        validationSchema: confirmEmailSchema,
        onSubmit
    })

    return <>
        <PageBreadcrumb title={'auth / Email-verification'}/>
        <Box bg={'white'} maxW={'500px'} w={'full'} mx={'auto'} my={5} py={5} px={5} boxShadow={'2xl'}>
            <Heading fontSize={24} pb={3} textAlign='center'>Email Verification</Heading>
            {!flag
                ? <FormControl>
                    <form onSubmit={handleSubmit}>
                        <FormControl mb={3}>
                            <Input
                                w='full'
                                type='text'
                                placeholder='expemple@gmail.com'
                                {...getFieldProps('email')}
                            />
                            {errors.email && touched.email && <ErrorMassage children={errors.email}/>}
                        </FormControl>
                        <FormControl w='20%' mx={'auto'} mt={5}>
                            <Button
                                colorScheme={'black'}
                                color={'beige'}
                                bg={'#131928'}
                                w={'full'}
                                mx={'auto'}
                                rounded={'full'}
                                type='submit'
                            >
                                Confirm
                            </Button>
                        </FormControl>
                    </form>
                </FormControl>
                : <PinCodeControl userInfo={values}/>
            }
        </Box>
    </>
}
