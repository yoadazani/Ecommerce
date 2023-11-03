import React, {FC} from 'react';
import {Box, Container, Heading, Spinner, Stack, Text} from "@chakra-ui/react";
import {useOrders} from "../../../hooks/useOrders";
import {PageBreadcrumb} from "../../customComps/pageBreadcrumb";
import {useQueryString} from "../../../hooks/useQueryString";
import {OrdersFilters} from "./ordersFilters";
import {OrderCard} from "./orderCard";
import {EmptyOrdersMessage} from "./emptyOrdersMassage";


export const Orders: FC = () => {

    const {query} = useQueryString()
    const {ordersList, error, isError, isLoading} = useOrders()

    if (isError) return <>{JSON.stringify(error)}</>
    if (isLoading) return <Spinner/>

    const filteredOrders = (query.get("q") === "all-orders" && query.has("order_id"))
        ? ordersList?.filter((order) => {
            return order.id === query.get("order_id")
        })
        : (query.get("q") === "all-orders" && !query.has("order_id"))
            ? ordersList
            : ordersList?.filter((order) => {
                return (order.status === query.get("q"))
            })

    return <>
        <PageBreadcrumb title={'my-orders'}/>
        <Container maxW={"container.xl"} px={{base: 2, md: 12}} pt={5} pb={"5rem"}>
            <Heading fontSize={20} textAlign={'center'} pb={5}> My Orders </Heading>
            <Stack align={"flex-start"}>
                <OrdersFilters/>
                <Stack
                    p={2}
                    bg={"white"}
                    w={"full"}
                    maxW={'100%'}
                >
                    {ordersList?.length === 0 && <EmptyOrdersMessage/>}
                    {filteredOrders?.length !== 0
                        ? filteredOrders?.map((order) => {
                            return <OrderCard
                                key={order.id}
                                order={order}
                            />
                        })
                        : <Text textAlign="center" fontWeight="bolder" color="blackAlpha.700">No orders found!</Text>
                    }
                </Stack>
            </Stack>
        </Container>
    </>
}
