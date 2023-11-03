import React from 'react';
import {Button, Image, Text, VStack} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";
import {ConnectAccountModal} from "../../modals/connectAccountModal";

export const EmptyWishListMessage = () => {

    const navigate = useNavigate()
    const isAuthenticated = useIsAuthenticated()

    return <VStack alignContent={"center"} gap={5} p={5}>
        <Image src={'https://sheinsz.ltwebstatic.com/she_dist/images/shoppingcart-empty-50eb82fb72.png'}/>
        <Text
            fontSize={14}
            textAlign={'center'}
            color={'blackAlpha.600'}
        >
            It is empty here. <br/>
            Personalize your shopping experience with your Wishlist.
        </Text>
        <Text fontSize={20} fontWeight={'bold'}>
            Already have items saved?
        </Text>
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
                    sign in to view your wishList and start shopping
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
