import {IOrders} from "../../../interfaces/IOrders.interface";
import {useProducts} from "../../../hooks/useProducts";
import {useOrders} from "../../../hooks/useOrders";
import {Box, Button, Divider, HStack, Image, Spacer, Stack, Text, Tooltip, useMediaQuery} from "@chakra-ui/react";
import {IProducts} from "../../../interfaces/Iproducts.interface";
import {Icon} from "@chakra-ui/icons";
import {FcCancel} from "react-icons/all";
import {slicingFormat} from "../../../utilities/stringSlicingFormat";
import {formatCurrency} from "../../../utilities/formatCurrency";
import React from "react";
import {OrderDetails} from "./orderDetails";

export const OrderCard = (props: { order: IOrders }) => {

    const {getProductsImages} = useOrders()
    const {cancelSpecificOrder} = useOrders()
    const [isLargerThen678] = useMediaQuery("(min-width: 678px)")

    const {products} = props.order
    const images = getProductsImages(products)
    const orderDate = new Date(props.order.createdAt).toDateString()
    const orderTime = new Date(props.order.createdAt).toLocaleTimeString()

    const statusColor = (status: string): string => {
        switch (status) {
            case "paid":
                return "green.500"
            case "processing":
                return "yellow.500"
            case "shipped":
                return "blue.500"
            case "delivered":
                return "blue.200"
            case "canceled":
                return "red.500"
            case "returned":
                return "gray.500"
            default:
                return "gray.500"
        }
    }

    return <Box>
        <HStack py={2} justify={"space-between"}>
            <HStack
                spacing={5}
                fontSize={14}
                fontWeight={"semibold"}
                color={"blackAlpha.700"}
            >
                <HStack>
                    <Text>{orderDate}</Text>
                    <Text>{orderTime}</Text>
                </HStack>
            </HStack>
            <Tooltip hasArrow label='Cancel Order' fontSize='sm' bg='gray.300' color='black'>
                <Box>
                    <Icon
                        as={FcCancel}
                        fontSize={20}
                        color={"red.500"}
                        cursor={"pointer"}
                        onClick={() => cancelSpecificOrder(props.order)}
                    />
                </Box>
            </Tooltip>
        </HStack>
        <Text color={"blackAlpha.600"} fontSize={13}>
            <b>Order ID: </b>
            {isLargerThen678
                ? props.order.id
                : slicingFormat(props.order.id, 0, 30)}
        </Text>
        <HStack w={"100%"} textAlign={"left"} align={"start"} color={"blackAlpha.700"} py={2}>
            <Image maxW={"100px"} src={images[0]}/>
            <Stack>
                <HStack>
                    <Box
                        w={"10px"}
                        h={"10px"}
                        rounded={"full"}
                        bg={statusColor(props.order.status).toString()}
                    />
                    <Text>{props.order.status}</Text>
                </HStack>

                <Text w={"100%"}>
                    {props.order.products.length} Item{props.order.products.length > 1 ? "s" : null}
                </Text>
                <Text w={"100%"} fontWeight={"bold"}>
                    total: {formatCurrency(props.order.amount.totalPrice)}
                </Text>
            </Stack>
            <Spacer/>
            <OrderDetails order={props.order}/>
        </HStack>
        <Divider borderColor="blackAlpha.400" mt={2}/>
    </Box>
}
