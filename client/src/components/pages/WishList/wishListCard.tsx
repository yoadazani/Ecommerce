import React, {FC, useState} from 'react';
import {Box, Button, HStack, Image, Img, Spinner, Stack, Text, useMediaQuery} from "@chakra-ui/react";
import {IWishListCard} from "../../../interfaces/IWishListCard.interface";
import {useProducts} from "../../../hooks/useProducts";
import {IProducts} from "../../../interfaces/Iproducts.interface";
import {slicingFormat} from "../../../utilities/stringSlicingFormat";
import {formatCurrency} from "../../../utilities/formatCurrency";
import {Icon} from "@chakra-ui/icons";
import {AiFillStar, IoHeartDislikeOutline, MdOutlineAddShoppingCart} from "react-icons/all";
import {useShoppingCart} from "../../../hooks/useShoppingCart";
import {useWishList} from "../../../hooks/useWishList";
import {useNavigate} from "react-router-dom";
import {v4 as uuidV4} from "uuid";
import {useAuthUser} from "react-auth-kit";

export const WishListCard: FC<IWishListCard> = ({item, gridTemplate}) => {

    const navigate = useNavigate()
    const {productsArray} = useProducts()
    const {addToCart} = useShoppingCart()
    const {deleteFromWishList} = useWishList()
    const [isLargerThen480] = useMediaQuery('(min-width: 480px)')
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const currentItem = productsArray?.find((i: IProducts) => (i.id === item.productID))
    const auth = useAuthUser()

    const navigateToCurrentPage = () => navigate(`/store/item/${currentItem.id}`)
    const handleDelete = () => {
        setLoading(true)
        setTimeout(() => {
            deleteFromWishList(item)
            setLoading(false)
        }, 1000)
    }
    const handleAddToCart = () => {
        setLoading(true)
        setTimeout(() => {
            addToCart({
                id: uuidV4(),
                userID: auth()?.id,
                productID: currentItem.id,
                color: currentItem?.colors[0],
                size: currentItem.sizes[0],
                quantity: 1,
                isChecked: false
            })
            setLoading(false)
        }, 1000)
    }

    return <Stack
        opacity={loading ? 0.5 : 1}
        borderWidth={1}
        borderColor={'blackAlpha.200'}
        overflow={'hidden'}
        rounded={'md'}
        pos={"relative"}
        direction={gridTemplate < 2 ? "row" : "column"}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <Box
            w={'full'}
            maxW={gridTemplate > 1 ? '100%' : '25%'}
            maxH={'300px'}
            overflow={'hidden'}
        >
            <Image
                objectFit={'cover'}
                objectPosition={'top'}
                w={"full"}
                h={"full"}
                maxW={'100%'}
                src={currentItem?.picture[0]}
                alt={'product image'}
            />
        </Box>
        <Stack px={1}>
            <Text
                color={'blackAlpha.600'}
                fontSize={14}
                cursor={"pointer"}
                _hover={{transition: '.5s', color: 'blackAlpha.700'}}
                onClick={navigateToCurrentPage}
            >
                {slicingFormat(currentItem?.productName, 0, (isLargerThen480) ? 25 : 16)}
            </Text>
            <HStack>
                <Text fontWeight={'bold'}>
                    {formatCurrency(currentItem?.price)}
                </Text>
                <HStack spacing={0}>
                    {Array.from({length: currentItem?.rating},
                        (_, i) => i + 1).map((i) => (
                        <Icon key={i} color={"gold"} as={AiFillStar}/>
                    ))}
                </HStack>
            </HStack>
            {isHovered && <>
                {loading && <Spinner pos={'absolute'} color={'white'} top={'25%'} left={'45%'}/>}
                <Icon
                    as={MdOutlineAddShoppingCart}
                    cursor={'pointer'}
                    fontSize={20}
                    pos={"absolute"}
                    color={"blackAlpha.700"}
                    top={1}
                    right={1}
                    onClick={handleAddToCart}
                />
                <Icon
                    as={IoHeartDislikeOutline}
                    cursor={'pointer'}
                    fontSize={20}
                    pos={"absolute"}
                    color={"blackAlpha.700"}
                    top={8}
                    right={1}
                    onClick={handleDelete}
                />
            </>}
        </Stack>
    </Stack>
}
