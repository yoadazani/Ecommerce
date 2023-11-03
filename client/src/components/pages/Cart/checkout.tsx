import {Divider, Heading, Stack, StackProps, Text, Wrap, WrapItem} from "@chakra-ui/react";
import {FC, useMemo} from "react";
import {CartTotalPrice} from "./cartTotalPrice";
import {PaypalPayment} from "./paypalPayment";
import {StandardPayment} from "./standardPayment";
import {OrderProvider} from "../../../context/orderProvider";

export const acceptPaymentImages = [
    'https://download.logo.wine/logo/Mastercard/Mastercard-Logo.wine.png',
    'https://www.svgrepo.com/show/328144/visa.svg',
    'https://cdn.worldvectorlogo.com/logos/maestro-2.svg',
    'https://www.svgrepo.com/download/508410/cb.svg',
    'https://www.svgrepo.com/show/14823/amex.svg',
    'https://www.vectorlogo.zone/logos/paypal/paypal-ar21.svg',
    'https://cdn-icons-png.flaticon.com/512/196/196559.png',
    'https://www.svgrepo.com/download/328151/discover.svg'
]
export const Checkout: FC<StackProps> = ({...rest}) => {

    return <Stack {...rest}>
        <Heading size={'md'} p={2}>Order summary</Heading>
        <Divider/>

        <OrderProvider>
            <CartTotalPrice/>

            <StandardPayment/>

            <PaypalPayment/>
        </OrderProvider>

        <Divider/>
        <Text textAlign={'center'} color={'blackAlpha.500'}>
            Coupons/Rewards can be used in the next step
        </Text>

        <Divider/>

        <Stack p={5}>
            <Heading fontSize={20}>We accept</Heading>
            <Wrap align={'center'} spacing={5}>
                {
                    acceptPaymentImages.map((imgIcon, index) => (
                        <WrapItem
                            key={index}
                            h={'40px'}
                            w={'full'}
                            maxW={'50px'}
                            borderWidth={1}
                            borderColor={'blackAlpha.400'}
                            rounded={"md"}
                            bgRepeat={'no-repeat'}
                            bgSize={'contain'}
                            bgPos={'center'}
                            bgImg={imgIcon}/>
                    ))
                }
            </Wrap>
        </Stack>
    </Stack>
}
