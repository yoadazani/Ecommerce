import React, {FC, useContext, useEffect, useState} from "react";
import {paginationProvider} from "../../../context/paginationProvider";
import {Badge, Box, BoxProps, HStack, Spacer, Text} from "@chakra-ui/react";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/all";

const StoreFooterPagination: FC<BoxProps> = ({...rest}) => {
    const {
        setCurrentPage,
        currentPage,
        paginatedProductAmounts
    } = useContext(paginationProvider)

    return <HStack {...rest}>
        <MdKeyboardArrowLeft
            opacity={currentPage === 1 ? 0 : 1}
            cursor={'pointer'}
            onClick={() => {
                if (currentPage !== 1) {
                    setCurrentPage(currentPage - 1)
                }
            }}
        />
        <HStack gap={2}>
            {paginatedProductAmounts.map(pageNumber => {
                return <Box
                    key={pageNumber}
                    px={'6px'}
                    fontSize={"xs"}
                    rounded={"full"}
                    cursor={'pointer'}
                    fontWeight={"medium"}
                    bg={currentPage === pageNumber + 1 ? "#131928" : "blackAlpha.200"}
                    color={currentPage !== pageNumber + 1 ? "#131928" : "whitesmoke"}
                    onClick={() => setCurrentPage(pageNumber + 1)}
                >
                    {pageNumber + 1}
                </Box>
            })}
        </HStack>
        <MdKeyboardArrowRight
            opacity={currentPage === paginatedProductAmounts.length ? 0 : 1}
            cursor={'pointer'}
            onClick={() => {
                if (currentPage !== paginatedProductAmounts.length) {
                    setCurrentPage(currentPage + 1)
                }
            }}
        />
    </HStack>

}

export const StoreFooter: FC<BoxProps> = ({ ...rest}) => {

    const {
        indexOfFirstProduct,
        indexOfLastProduct,
        currentPage,
        limit,
        productsQuantity
    } = useContext(paginationProvider)

    const [lastProductIndex, setLastProductIndex] = useState<number>(indexOfLastProduct);

    useEffect(() => {
        if (productsQuantity) {
            const lastProductOnPage = Math.min(limit * currentPage, productsQuantity);
            setLastProductIndex(lastProductOnPage)
        }
    }, [currentPage, limit, productsQuantity]);


    return <HStack {...rest}>
        <Badge
            rounded={"lg"}
            p={2}
        >
            <Text
                fontSize={'2xs'}
                textTransform={'capitalize'}
            >
                Products: {indexOfFirstProduct + 1} - {lastProductIndex}.
            </Text>
        </Badge>
        <Spacer/>
        <StoreFooterPagination/>
    </HStack>
}