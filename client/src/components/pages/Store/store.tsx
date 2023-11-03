import React, {FC} from 'react';
import {
    Container,
    Flex,
    Spacer, Spinner, Stack,
} from "@chakra-ui/react";
import {PaginationProvider} from "../../../context/paginationProvider";
import StoreFilters from "./storeFilters";
import {PageBreadcrumb} from "../../customComps/pageBreadcrumb";
import {RandomProducts} from "./randomProducts";
import {StoreFooter} from "./storeFooter";
import {StoreShopByCategory} from "./storeShopByCategory";
import {StoreHeader} from "./storeHeader";
import {useFilters} from "../../../hooks/useFilters";
import {ProductsGrid} from "./productsGrid";
import {useProducts} from "../../../hooks/useProducts";
import {useQueryString} from "../../../hooks/useQueryString";

export const Store: FC = () => {

    const {query} = useQueryString()

    const {productsArray, isLoading, error, isError} = useProducts()

    const products = productsArray ?? [];
    const FilteredProducts = useFilters(products, query.toString())


    if (isError) return <>{JSON.stringify(error)}</>
    if (isLoading) return <Spinner/>
    return <>
        <PageBreadcrumb title={'Store'}/>
        <Container maxW={"container.xl"} px={{md: 12}} pt={5} pb={"5rem"}>
            <Flex gap={2}>
                <Stack w={'full'} maxW={{md: '22%'}} display={{base: "none", md: "block"}}>
                    {/*store shop by category section*/}
                    <StoreShopByCategory
                        p={2}
                        rounded={"md"}
                        bg={"white"}
                        boxShadow={"md"}
                    />
                    {/*nav-left section*/}
                    <StoreFilters
                        p={2}
                        rounded={"md"}
                        bg={"white"}
                        boxShadow={"md"}
                    />
                    {/*store custom products section*/}
                    <RandomProducts
                        p={2}
                        rounded={"md"}
                        bg={"white"}
                        boxShadow={"md"}
                        minH={"250px"}
                    />
                </Stack>
                <Stack
                    w={'full'}
                    maxW={{md: "80%"}}
                    spacing={2}
                >
                    <PaginationProvider productsQuantity={FilteredProducts.length}>
                        {/*top section*/}
                        <StoreHeader
                            p={2}
                            rounded={"md"}
                            bg={"white"}
                            boxShadow={"md"}
                        />
                        {/*main section*/}
                        <ProductsGrid
                            columns={{
                                base: 2,
                                sm: 3,
                                md: 4
                            }}
                            spacing={3}
                            filteredProducts={FilteredProducts}
                        />
                        <Spacer/>
                        {/*footer section*/}
                        <StoreFooter
                            p={2}
                            rounded={"md"}
                            bg={"white"}
                            boxShadow={"md"}
                        />
                    </PaginationProvider>
                </Stack>
            </Flex>
        </Container>
    </>
}

