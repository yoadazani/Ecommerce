import React, {FC, useContext} from 'react';
import {
    Box,
    Heading,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay, SimpleGrid,
    Slide, Stack,
    useMediaQuery
} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {AiOutlineClose} from "react-icons/all";
import {ProductCard} from "../customComps/productCard";
import {similarItemsProvider} from "../../context/similarItemsProvider";
import {useProducts} from "../../hooks/useProducts";
import { IProducts } from '../../interfaces/Iproducts.interface';

type TSimilarItems = {
    onClose: () => void
    id: string | undefined
}

const SimilarItems: FC<TSimilarItems> = ({onClose, id}) => {
    const [isLargerThen768] = useMediaQuery('(min-width: 768px)')

    const {productsArray} = useProducts()
    const products = productsArray ?? []

    return <Box
        color='white'
        h={isLargerThen768 ? '400px' : '100vh'}
        maxW={"full"}
        bg='whitesmoke'
        rounded='md'
        shadow='md'
    >
        <Stack isInline
               align={"center"}
               justify={"space-between"}
               color={"black"}
               p={2}
               mb={2}
               bg={"white"}
        >
            <Box textAlign={"center"} width={'100%'}>
                <Heading fontSize={24}>Find Similar</Heading>
            </Box>
            <Icon as={AiOutlineClose} onClick={onClose}/>
        </Stack>
        <Box maxH={{base: '100%', md: '78%'}}
             py={4}
             px={2}
             overflowX={'hidden'}
             sx={{'::-webkit-scrollbar': {display: 'none'}}}
        >
            <SimpleGrid columns={{base: 2, sm: 3, md: 4, lg: 5}} spacingX={3} spacingY={4}>
                {products.map((item: IProducts, i: number) => {
                    if (item.categoryID === id && i < 10) {
                        return <ProductCard
                            key={i}
                            product={item}
                        />
                    }
                })}
            </SimpleGrid>
        </Box>
    </Box>
}

export const SimilarItemsModal = () => {

    const {isOpen, onClose, categoryID} = useContext(similarItemsProvider)
    const [isLargerThen768] = useMediaQuery('(min-width: 768px)')

    return <>
        {!isLargerThen768
            ? <Slide direction={"bottom"} in={isOpen} style={{zIndex: 100}}>
                <SimilarItems onClose={onClose} id={categoryID}/>
            </Slide>

            : <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent m={'auto'} p={0} maxW={900}>
                    <ModalBody p={0}>
                        <SimilarItems onClose={onClose} id={categoryID}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        }
    </>
}