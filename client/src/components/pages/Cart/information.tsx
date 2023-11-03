import {FC, useContext, useEffect, useMemo} from 'react';
import {Box, Button, Checkbox, FormControl, HStack, Input, Text,} from "@chakra-ui/react";
import {followSteps} from "./stripePayment";
import {Select} from "chakra-react-select";
import {useUserInfo} from "../../../hooks/useUserData";
import {useAuthUser} from "react-auth-kit";
import {orderProvider} from "../../../context/orderProvider";
import {IOrders} from "../../../interfaces/IOrders.interface";
import {orderSchema} from "../../../schemes/orderSchema";
import {ErrorMassage} from "../../customComps/errorMassage";
import {useOrders} from "../../../hooks/useOrders";
import {useCountriesList} from "../../../hooks/useCountriesList";
import {useFormik} from "formik";
import {v4 as uuidV4} from "uuid";

export const Information: FC<followSteps> = ({setStep}) => {
    const auth = useAuthUser()
    const {amount: totalPrice, orderList} = useContext(orderProvider)
    const {userInfo} = useUserInfo()
    const countries = useCountriesList()
    const {addOrder} = useOrders()
    const {orderId} = useContext(orderProvider)


    const countriesOptions = useMemo(() => {
        return countries?.map(country => {
            return {
                label: country.name,
                value: country.unicodeFlag,
                cities: country.cities
            }
        })
    }, [countries])


    const initialValues: IOrders = {
        id: orderId,
        status: "unpaid",
        userId: auth()?.id,
        payer: {
            name: "",
            email: "",
            phone: "",
        },
        address: {
            id: uuidV4(),
            userId: auth()?.id,
            city: "",
            country: "",
            zipCode: "",
            addressLine: "",
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now())
        },
        amount: {
            totalPrice: parseInt(totalPrice?.toFixed(2)),
            currency: "USD"
        },
        products: orderList,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
    }
    const onSubmit = () => {
        addOrder(values)
        resetForm()
        setStep(2)
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
        validationSchema: orderSchema,
        onSubmit
    })

    return <Box bg={"white"} maxW={'500px'} w={'full'} mx={'auto'} my={5} py={5} px={5} boxShadow={'2xl'}>
        {userInfo?.address.length !== 0 &&
            <Checkbox onChange={() => console.log(userInfo)}>
                <Text fontSize={18} maxW={'100%'} w={'full'} textAlign={'center'}>
                    Use default address
                </Text>
            </Checkbox>
        }
        <form onSubmit={handleSubmit}>
            <FormControl my={3}>
                <Input
                    type='text'
                    placeholder='Full Name'
                    {...getFieldProps("payer.name")}
                />
                {errors.payer?.name && touched.payer?.name &&
                    <ErrorMassage children={errors.payer?.name}/>}
            </FormControl>
            <FormControl mb={3}>
                <Input
                    type='text'
                    placeholder='E-mail'
                    {...getFieldProps("payer.email")}
                />
                {errors.payer?.email && touched.payer?.email &&
                    <ErrorMassage children={errors.payer?.email}/>}
            </FormControl>
            <FormControl mb={3}>
                <Input
                    type='text'
                    placeholder='Phone Number'
                    {...getFieldProps("payer.phone")}
                />
                {errors.payer?.phone && touched.payer?.phone &&
                    <ErrorMassage children={errors.payer?.phone}/>}
            </FormControl>
            <FormControl mb={3}>
                <Input
                    type='text'
                    placeholder='AddressLine'
                    {...getFieldProps("address.addressLine")}
                />
                {errors.address?.addressLine && touched.address?.addressLine &&
                    <ErrorMassage children={errors.address?.addressLine}/>}
            </FormControl>
            <HStack mb={3}>
                <FormControl>
                    <Input
                        type='text'
                        placeholder='ZipCode'
                        {...getFieldProps("address.zipCode")}
                    />
                    {errors.address?.zipCode && touched.address?.zipCode &&
                        <ErrorMassage children={errors.address?.zipCode}/>}
                </FormControl>
                <FormControl>
                    <Input
                        type='text'
                        placeholder='city'
                        {...getFieldProps("address.city")}
                    />
                    {errors.address?.city && touched.address?.city &&
                        <ErrorMassage children={errors.address?.city}/>}
                </FormControl>
            </HStack>
            <FormControl my={3}>
                <Select
                    selectedOptionStyle={'check'}
                    placeholder='Country'
                    options={countriesOptions}
                    getOptionLabel={option => values.address.country = option.label}
                />
                {errors.address?.country && touched.address?.country &&
                    <ErrorMassage children={errors.address?.country}/>}
            </FormControl>
            <FormControl w='25%' my={5}>
                <Button
                    colorScheme={'black'}
                    color={'beige'}
                    bg={'#131928'}
                    w={'full'}
                    mx={'auto'}
                    rounded={'full'}
                    type='submit'
                >
                    Continue
                </Button>
            </FormControl>
        </form>
    </Box>
}
