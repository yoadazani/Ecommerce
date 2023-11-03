import React, {FC} from 'react';
import {
    Box, Divider, HStack, Spacer,
    Tab,
    Table,
    TableContainer,
    TabList,
    TabPanel,
    TabPanels,
    Tabs, Tbody, Td, Text,
    Th,
    Thead, Tr
} from "@chakra-ui/react";
import {ISpecificProduct} from "../../../interfaces/IspecificProduct.interface";
import {Icon} from "@chakra-ui/icons";
import {AiFillStar} from "react-icons/all";


type TProductTabs = {
    product: ISpecificProduct
}
export const ProductTabs: FC<TProductTabs> = ({product}) => {


    return <Tabs pt={5} maxW={'100$'} size='md' variant='enclosed'>
        <TabList gap={5}>
            <Tab _selected={{color: 'white', bg: 'blackAlpha.800'}}>Specifications</Tab>
            <Tab _selected={{color: 'white', bg: 'blackAlpha.800'}}>About</Tab>
            <Tab _selected={{color: 'white', bg: 'blackAlpha.800'}}>Reviews</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <TableContainer textAlign={"left"}>
                    <Table size={'sm'} variant={'striped'}>
                        <Thead borderBottomWidth={1} borderColor={'blackAlpha.700'}>
                            <Tr>
                                <Th>key</Th>
                                <Th>value</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {product?.itemSpecifics.map((specification, i) => (
                                <Tr key={i}>
                                    <Td fontWeight={'bold'}>{specification.key}</Td>
                                    <Td>{specification.value}</Td>
                                </Tr>
                            ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </TabPanel>
            <TabPanel>
                <p>{product?.description}</p>
            </TabPanel>
            <TabPanel>
                {product?.reviews.map((review, i) => (
                    <Box key={i}>
                        <HStack spacing={5}>
                            <Text fontWeight={"bold"}>{review.name?.[0] + '***' + review.name?.[review.name.length - 1]}</Text>
                            <Text>{new Date(review.createdAt).toDateString()}</Text>
                            <Text>{new Date(review.createdAt).toLocaleTimeString()}</Text>
                            <Spacer/>
                            <Text>
                                {Array.from({length: review?.rating},
                                    (_, i) => i + 1).map((i) => (
                                    <Icon key={i} color={"gold"} as={AiFillStar}/>
                                ))}
                            </Text>
                        </HStack>
                        <HStack spacing={5}>
                            <HStack
                                color={'blackAlpha.500'}
                                fontSize={14}
                            >
                                <Text>Color: </Text>
                                <Text>{review.color.toUpperCase()}</Text>
                            </HStack>
                            <HStack
                                color={'blackAlpha.500'}
                                fontSize={14}
                            >
                                <Text>Size: </Text>
                                <Text>{review.size.toUpperCase()}</Text>
                            </HStack>
                        </HStack>
                        <Text fontFamily={'cursive'}>{review.comment}</Text>
                        <Divider mt={3}/>
                    </Box>
                ))}
            </TabPanel>
        </TabPanels>
    </Tabs>
}
