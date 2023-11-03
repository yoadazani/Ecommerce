import {FC} from "react";
import {Box, Button, Divider, FormControl, Heading, Input, Spacer, Text, VStack} from "@chakra-ui/react";
import {TForm} from "./registerForm";
import {useFormik} from "formik";
import {ErrorMassage} from "../customComps/errorMassage";
import {loginSchema} from "../../schemes/loginSchema";
import {useLogin} from "../../hooks/useLogin";
import {useNavigate} from "react-router-dom";
import {GoogleAuth} from "./googleAuth";
import {DecisionDivider} from "../customComps/decisionDivider";
import {PageBreadcrumb} from "../customComps/pageBreadcrumb";


export const LoginForm: FC<TForm> = ({onClose}) => {

    const navigate = useNavigate()
    const {login} = useLogin()
    const initialValues = {
        email: "",
        password: ""
    }
    const onSubmit = () => {
        login(values)
        resetForm()
        navigate('/store')
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
        validationSchema: loginSchema,
        onSubmit
    })

    return <>
        <PageBreadcrumb title={'auth / Login'}/>
        <Box bg={"white"} maxW={'500px'} w={'full'} mx={'auto'} my={5} py={5} px={5} boxShadow={'2xl'}>
            <Heading fontSize={24} textAlign='center' mb={3}>Sign-in to your account</Heading>
            <FormControl>
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
                    <FormControl mb={3}>
                        <Input
                            w='full'
                            type='text'
                            placeholder='Password'
                            {...getFieldProps('password')}
                        />
                        {errors.password && touched.password && <ErrorMassage children={errors.password}/>}
                    </FormControl>
                    <Text
                        textAlign={'right'}
                        cursor='pointer'
                        fontWeight={'semibold'}
                        onClick={() => navigate(`/auth/email-verification`)}
                    >
                        Forgot password?
                    </Text>
                    <FormControl w='20%' mx={'auto'} my={5}>
                        <Button
                            colorScheme={'black'}
                            color={'beige'}
                            bg={'#131928'}
                            w={'full'}
                            mx={'auto'}
                            rounded={'full'}
                            type='submit'
                        >
                            Log in
                        </Button>
                    </FormControl>
                </form>
                <DecisionDivider/>
                <VStack my={5}>
                    <GoogleAuth onClose={onClose}/>
                </VStack>
                <Text textAlign={'center'} cursor='pointer' onClick={() => navigate('/auth/register')}>
                    You don`t have an account yet?
                </Text>
                <Spacer/>
            </FormControl>
        </Box>
    </>
}
