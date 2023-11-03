import {Dispatch, FC} from "react";
import {
    FormControl,
    Input,
    Button,
    Heading, Box, Text, VStack
} from '@chakra-ui/react'
import {IUser} from "../../interfaces/IUser.interface";
import {useFormik} from 'formik'
import {v4 as uuidV4} from "uuid";
import {registerSchema} from "../../schemes/userScheme";
import {ErrorMassage} from "../customComps/errorMassage";
import {useLogin} from "../../hooks/useLogin";
import {GoogleAuth} from "./googleAuth";
import {useNavigate} from "react-router-dom";
import {DecisionDivider} from "../customComps/decisionDivider";
import {PageBreadcrumb} from "../customComps/pageBreadcrumb";


export type TForm = {
    setHaveAccount?: Dispatch<boolean>
    onClose?: () => void
}
export const RegisterForm: FC<TForm> = ({onClose}) => {

    const navigate = useNavigate()
    const {register} = useLogin()
    const initialValues: IUser = {
        id: uuidV4(),
        provider: "gmail",
        userName: "",
        email: "",
        phone: "",
        password: "",
        role: "user",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        address: []
    }
    const onSubmit = () => {
        register(values)
        resetForm()
        navigate('/auth/login')
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
        validationSchema: registerSchema,
        onSubmit
    })


    return <>
        <PageBreadcrumb title={'auth / Register'}/>
        <Box bg={"white"} maxW={'500px'} w={'full'} mx={'auto'} my={5} py={5} px={5} boxShadow={'2xl'}>
            <Heading fontSize={24} textAlign='center' mb={3}>Create account right here</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl mb={3}>
                    <Input
                        w='full'
                        type='text'
                        placeholder='Enter full name'
                        {...getFieldProps('userName')}
                    />
                    {errors.userName && touched.userName && <ErrorMassage children={errors.userName}/>}
                </FormControl>

                <FormControl mb={3}>
                    <Input
                        w='full'
                        type='tel'
                        placeholder='Insert your phone number'
                        {...getFieldProps('phone')}
                    />
                    {errors.phone && touched.phone && <ErrorMassage children={errors.phone}/>}
                </FormControl>

                <FormControl mb={3}>
                    <Input
                        w='full'
                        type='email'
                        placeholder='expemple@gmail.com'
                        {...getFieldProps('email')}
                    />
                    {errors.email && touched.email && <ErrorMassage children={errors.email}/>}
                </FormControl>

                <FormControl mb={3}>
                    <Input
                        w='full'
                        type='text'
                        placeholder='Password (min 8 character)'
                        {...getFieldProps('password')}
                    />
                    {errors.password && touched.password && <ErrorMassage children={errors.password}/>}
                </FormControl>


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
                        Register
                    </Button>
                </FormControl>
            </form>
            <DecisionDivider/>
            <VStack my={5}>
                <GoogleAuth onClose={onClose}/>
            </VStack>
            <Text textAlign={'center'} cursor='pointer' onClick={() => navigate('/auth/login')}>
                already have an account?
            </Text>
        </Box>
    </>
}
