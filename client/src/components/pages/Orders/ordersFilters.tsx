import {useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, HStack, Input, InputGroup, InputLeftElement, Spacer, useMediaQuery} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {BsSearch, HiMenuAlt2} from "react-icons/all";


const filtersTypes: string[] = [
    "All-Orders",
    "Paid",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
    "Returned"
]
export const OrdersFilters = () => {

    const [q, setQ] = useSearchParams()
    const [searchByOrderId, setSearchByOrderId] = useSearchParams()
    const [searchBarOpen, setSearchBarOpen] = useState(false)
    const [isLargerThen678] = useMediaQuery("(min-width: 678px)")

    const [userSearch, setUserSearch] = useState<string>(q?.get("order_id") || "")

    useEffect(() => {
        if (q.has("q")) {
            return setQ(q)
        } else {
            q.set("q", "all-orders")
            return setQ(q);
        }
    }, [])

    const filterOrders = (filter: string) => {
        q.set("q", filter.toLowerCase())
        setQ(q)
    }

    const searchHandler = (userSearch: string) => {
        if (!searchByOrderId.has("order_id") && userSearch === "") return
        if (searchByOrderId.has("order_id") && userSearch === "") {
            searchByOrderId.delete("order_id")
            return setSearchByOrderId(searchByOrderId)
        } else {
            searchByOrderId.set("order_id", userSearch)
            setSearchByOrderId(searchByOrderId)
        }
        setSearchBarOpen(false)
    }

    return <HStack
        p={3}
        bg={"white"}
        w={"full"}
    >
        {isLargerThen678
            ? <HStack>
                {filtersTypes.map((type, i) => {
                    return <Button
                        key={i}
                        variant={"outline"}
                        color={"black"}
                        rounded={0}
                        size={"sm"}
                        onClick={() => filterOrders(type)}
                    >{type}</Button>
                })}
            </HStack>
            : <Icon as={HiMenuAlt2} fontSize={24} color={"blackAlpha.600"} cursor={"pointer"}/>
        }
        <Spacer/>
        <InputGroup maxW={"250px"}>
            <Input
                size={"sm"}
                placeholder={"Order_NO / Product Name"}
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}/>
            <InputLeftElement
                pb={2}
                children={
                    <Icon
                        cursor={"pointer"}
                        as={BsSearch}
                        onClick={() => searchHandler(userSearch)}
                    />
                }/>
        </InputGroup>
    </HStack>
}
