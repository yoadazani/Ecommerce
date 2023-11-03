import React, {FC} from "react";
import {Button, Image, Text, VStack} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";
import {ConnectAccountModal} from "../../modals/connectAccountModal";

export const EmptyCartMessage: FC = () => {

    const navigate = useNavigate()
    const isAuthenticated = useIsAuthenticated()

    return <VStack gap={3} py={5}>
        <Image src={'https://sheinsz.ltwebstatic.com/she_dist/images/shoppingcart-empty-50eb82fb72.png'}/>
        <Text
            fontWeight={'extrabold'}
            fontSize={22}
        >YOUR BAG IS EMPTY!</Text>
        {isAuthenticated()
            ? <Button
                width={'full'}
                maxW={250}
                bg={"blackAlpha.900"}
                color={"whitesmoke"}
                onClick={() => navigate('/Store')}
            >SHOP NOW!</Button>
            : <>
                <Text>
                    sign in to view your cart and start shopping
                </Text>
                <Button
                    w={'full'}
                    maxW={'250px'}
                    colorScheme={'blackAlpha'}
                    bg={'black'}
                    children={<ConnectAccountModal btnText={'SIGN IN / REGISTER'}/>}
                />
            </>
        }
    </VStack>
}
