import React, {FC, useEffect, useState} from "react";
import {IProducts} from "../../../interfaces/Iproducts.interface";
import {Box, BoxProps, Divider, Heading, HStack, Image, Stack, Text, Wrap, WrapItem} from "@chakra-ui/react";
import {slicingFormat} from "../../../utilities/stringSlicingFormat";
import {formatCurrency} from "../../../utilities/formatCurrency";
import {useProducts} from "../../../hooks/useProducts";

export const RandomProducts: FC<BoxProps> = ({...rest}) => {
    const [randomProducts, setRandomProducts] = useState<IProducts[]>([])
    const {productsArray} = useProducts()

    const products = productsArray ?? []
    useEffect(() => {
        setRandomProducts(randomProducts => {
            if (randomProducts.length < 2) {
                return [
                    ...randomProducts,
                    products[Math.floor(Math.random() * products.length)]
                ] as IProducts[]
            } else {
                return randomProducts as IProducts[]
            }
        })
    }, [])

    return <Box {...rest} >
        <Heading
            as={'h3'}
            pb={2}
            fontSize={14}
        >
            Random Products
        </Heading>
        <Divider/>
        <Wrap>
            {randomProducts.map(item => {
                return <WrapItem key={item?.id}>
                    <HStack align={"flex-start"}>
                        <Image maxW={'4.5em'} objectFit={"cover"} src={item?.picture[0]}/>
                        <Stack>
                            <Text fontSize={"xs"} fontWeight={"medium"}
                                  as={"span"}>{slicingFormat(item?.productName, 0, 30)}</Text>
                            <Text fontWeight={"bold"} as={"span"}>{formatCurrency(item?.price)}</Text>
                        </Stack>
                    </HStack>
                </WrapItem>
            })}
            <Divider/>
        </Wrap>
    </Box>
}
