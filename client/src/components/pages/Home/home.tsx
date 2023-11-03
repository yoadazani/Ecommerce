import React, {FC, useRef} from 'react';
import categories from '../../../json/categories.json'
import mainImages from '../../../json/mainImages.json'
import {Carousel} from "../../customComps/carousel";
import {ProductCard} from "../../customComps/productCard";
import {Icon} from "@chakra-ui/icons";
import {useProducts} from "../../../hooks/useProducts";
import { IProducts } from '../../../interfaces/Iproducts.interface';
import {
    Container,
    Box,
    Heading,
    HStack,
    Text, Avatar, VStack, SimpleGrid, Spinner
} from "@chakra-ui/react";
import {
    BsPatchCheck,
    FaShippingFast,
    GiRibbonMedal,
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight, MdOutlineSupportAgent
} from "react-icons/all";
import {useNavigate, useSearchParams} from "react-router-dom";

const CategoriesSliderSection: FC = () => {

    const navigate = useNavigate()
    const [categoryID, setCategoryID] = useSearchParams()

    const categoriesRef = useRef<HTMLDivElement>(null)
    const imageWidthRef = useRef<HTMLDivElement>(null)

    const scrollFunc = (name: string) => {
        if (categoriesRef.current && imageWidthRef.current) {
            categoriesRef.current.scrollLeft += name === 'left'
                ? -imageWidthRef.current.clientWidth
                : imageWidthRef.current.clientWidth
        }
    }

    return <Box as={"section"}>
        <Heading py={5} px={2} fontSize={24}>Shop By Category</Heading>
        <Box pos={"relative"} maxH={200}>
            <HStack
                ref={categoriesRef}
                maxW={'90%'}
                mx={"auto"}
                overflow={"auto"}
                spacing={0}
                scrollBehavior={"smooth"}
                sx={{'::-webkit-scrollbar': {display: 'none'}}}
            >
                {categories.map(category => {
                    return <VStack
                        ref={imageWidthRef}
                        minW={{base: '33.33%', md: '25%', lg: '20%'}}
                        key={category?.categoryID}
                        onClick={() => {
                            categoryID.set("categoryID", category?.categoryID)
                            navigate(`/store?${categoryID.toString()}`)
                        }}
                    >
                        <Avatar src={category.image} size={{base: 'lg', sm: '2xl'}}/>
                        <Text color={"blackAlpha.500"} fontWeight={"bold"}>{category?.categoryName}</Text>
                    </VStack>
                })}
            </HStack>
            <Icon
                pos={"absolute"}
                left={{base: '3%', md: '2%'}}
                top={'35%'}
                fontSize={{base: 18, md: 32}}
                zIndex={1}
                cursor={'pointer'}
                rounded={"full"}
                color={"white"}
                bg={"blackAlpha.700"}
                as={MdOutlineKeyboardArrowLeft}
                onClick={() => scrollFunc('left')}
            />
            <Icon
                pos={"absolute"}
                right={{base: '3%', md: '2%'}}
                top={'35%'}
                fontSize={{base: 18, md: 32}}
                zIndex={1}
                cursor={'pointer'}
                rounded={"full"}
                color={"white"}
                bg={"blackAlpha.700"}
                as={MdOutlineKeyboardArrowRight}
                onClick={() => scrollFunc('right')}
            />
        </Box>
    </Box>
}

const RecommendationsSection: FC = () => {

    const {productsArray, isLoading, isError, error} = useProducts()

    if (isError) return <>{JSON.stringify(error)}</>
    if (isLoading) return <Spinner/>
    return <>
        <Heading py={5} px={2} fontSize={24}>Recommendations For You</Heading>
        <Box>
            {productsArray !== undefined
                && <SimpleGrid columns={{base: 2, sm: 3, md: 4, lg: 5}} spacingX={3} spacingY={4}>
                    {productsArray.map((product: IProducts, i: number) => {
                        return <ProductCard
                            key={i}
                            product={product}
                        />
                    }).slice(0, 10)}
                </SimpleGrid>}
            {productsArray === undefined && <Box>No product with this name!!</Box>}
        </Box>
    </>
}

export const Home: FC = () => {

    return <>
        <Container maxW={"container.xl"} px={{sm: 8}}>
            <Carousel
                arr={mainImages}
                autoSlide={true}
                autoSlideInterval={3000}
            />
            <CategoriesSliderSection/>
        </Container>
        <Container py={5} maxW={"container.xl"} px={{md: 8}}>
            <RecommendationsSection/>
        </Container>
        <Box my={5} py={10} bg={"blackAlpha.200"} color={"blackAlpha.700"}>
            <Container maxW={"container.xl"} px={8}>
                <SimpleGrid
                    columns={{base: 1, sm: 2, md: 4}}
                    spacingY={{base: 10, md: 0}}
                    spacingX={5}
                >
                    <HStack align={"flex-start"} spacing={5}>
                        <Icon as={GiRibbonMedal} color={"gold"} fontSize={32}/>
                        <Box>
                            <Heading as={"h3"} pb={5} fontSize={18}>
                                Best Quality
                            </Heading>
                            <Text>
                                All of our products uses the best <br/>
                                materials and choices for our <br/>
                                customers.
                            </Text>
                        </Box>
                    </HStack>
                    <HStack align={"flex-start"} spacing={5}>
                        <Icon as={FaShippingFast} color={"red.500"} fontSize={32}/>
                        <Box>
                            <Heading as={"h3"} pb={5} fontSize={16}>
                                Free Shipping
                            </Heading>
                            <Text>
                                Free shipping everytime you buy <br/>
                                products from us without <br/>
                                exception.
                            </Text>
                        </Box>
                    </HStack>
                    <HStack align={"flex-start"} spacing={5}>
                        <Icon as={MdOutlineSupportAgent} color={"blue.500"} fontSize={32}/>
                        <Box>
                            <Heading as={"h3"} pb={5} fontSize={16}>
                                24/7 Support
                            </Heading>
                            <Text>
                                Free shipping everytime you buy <br/>
                                products from us without <br/>
                                exception.
                            </Text>
                        </Box>
                    </HStack>
                    <HStack align={"flex-start"} spacing={5}>
                        <Icon as={BsPatchCheck} color={"green.400"} fontSize={30}/>
                        <Box>
                            <Heading as={"h3"} pb={5} fontSize={16}>
                                Warranty
                            </Heading>
                            <Text>
                                Every time you buy our products <br/>
                                you will get warranty <br/>
                                without exception.
                            </Text>
                        </Box>
                    </HStack>
                </SimpleGrid>
            </Container>
        </Box>
    </>
}
