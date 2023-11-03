import React, {useState} from 'react';
import {Box, Container, Heading, HStack, SimpleGrid, Spacer, Spinner, Text} from "@chakra-ui/react";
import {useWishList} from "../../../hooks/useWishList";
import {WishListCard} from "./wishListCard";
import {PageBreadcrumb} from "../../customComps/pageBreadcrumb";
import {SortBy} from "../../customComps/sortBy";
import {GenerateGridTemplate} from "../../customComps/generateGridTemplate";
import {EmptyWishListMessage} from "./emptyWishListMessage";

export const WishList = () => {

    const {wishListData, error, isError, isLoading} = useWishList()
    const [gridTemplate, setGridTemplate] = useState<number>(5)


    if (isError) return <>{JSON.stringify(error)}</>
    if (isLoading) return <Spinner/>

    return <>
        <PageBreadcrumb title={'Favorites'}/>
        <Container maxW={"container.xl"} px={{base: 2, md: 12}} pt={5} pb={"5rem"}>
            {
                (wishListData || [])?.length > 0 && <>
                    <Heading fontSize={20} textAlign={'center'} pb={2} children={"My Wish List"}/>
                    <HStack w={'100%'} bg={"white"} justify={'space-between'} boxShadow={"md"} rounded={"md"} p={2}>
                        <SortBy/>
                        <GenerateGridTemplate setGridTemplate={setGridTemplate}/>
                    </HStack>
                </>
            }
            <Box bg={'white'} w={'100%'} my={3} boxShadow={"md"} rounded={"md"}>
                {(wishListData || [])?.length > 0 ? <SimpleGrid
                    columns={{
                        base: gridTemplate < 2 ? gridTemplate : 2,
                        md: gridTemplate < 3 ? gridTemplate : 3,
                        lg: gridTemplate
                    }}
                    spacingY={4}
                    spacingX={gridTemplate < 3 ? 20 : 4}
                    p={3}
                >
                    {wishListData?.map(item => {
                        return <WishListCard key={item.id} item={item} gridTemplate={gridTemplate}/>
                    })}
                </SimpleGrid> : <EmptyWishListMessage/>}
            </Box>
        </Container>
    </>
}
