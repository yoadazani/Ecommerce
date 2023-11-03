import {SimpleGrid, SimpleGridProps} from "@chakra-ui/react";
import {ProductCard} from "../../customComps/productCard";
import React, {FC, useContext} from "react";
import {paginationProvider} from "../../../context/paginationProvider";
import {IProducts} from "../../../interfaces/Iproducts.interface";

interface IProductsGrid extends SimpleGridProps {
    filteredProducts: IProducts[]
}

export const ProductsGrid: FC<IProductsGrid> = ({
                                                    filteredProducts,
                                                    ...rest
                                                }) => {

    const {indexOfFirstProduct, indexOfLastProduct} = useContext(paginationProvider)
    return <SimpleGrid {...rest}>
        {filteredProducts?.map((product, i) => {
            return (
                <ProductCard
                    key={i}
                    product={product}
                    rounded={"md"}
                    overflow={"hidden"}
                />
            );
        }).slice(indexOfFirstProduct, indexOfLastProduct)}
    </SimpleGrid>
}
