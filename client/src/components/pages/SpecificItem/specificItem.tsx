import React, {useMemo} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {SpecificItemCard} from "./SpecificItemCard";
import {ISpecificProduct} from "../../../interfaces/IspecificProduct.interface";
import {useProducts} from "../../../hooks/useProducts";
import {Container, Spinner} from "@chakra-ui/react";

export const SpecificItem = () => {
    const params = useParams()
    const {productsArray, isError, error, isLoading} = useProducts()

    if (isError) return <div>{JSON.stringify(error)}</div>
    if (isLoading) return <Spinner/>

    const specificItem = productsArray?.find((p: ISpecificProduct) => {
        return (p.id === params.id)
    }) as ISpecificProduct

    return <Container maxW={"container.xl"} px={{md: 12}} py={2}>
        {specificItem
            ? <SpecificItemCard
                product={specificItem}
                rounded={"sm"}
                bg={"transparent"}
                shadow={'none'}
                p={0}
                direction={{
                    base: 'column',
                    md: 'row'
                }}
            />
            : null
        }
    </Container>
}
