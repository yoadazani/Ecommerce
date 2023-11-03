import {
    Box,
    Button,
    Divider,
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Spinner,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure
} from "@chakra-ui/react";
import React, {useState} from "react";
import {IOrders} from "../../../interfaces/IOrders.interface";
import {formatCurrency} from "../../../utilities/formatCurrency";
import {useOrders} from "../../../hooks/useOrders";
import {AiOutlineFileProtect, GiConfirmed, MdOutlineCancel, MdOutlineRateReview, VscLocation} from "react-icons/all";
import {slicingFormat} from "../../../utilities/stringSlicingFormat";
import {useCopy} from "../../../hooks/useCopy";
import {useNavigate} from "react-router-dom";

export const OrderDetails = (props: { order: IOrders }) => {
    const [loading, setLoading] = useState({
        cancel: false,
        confirm: false
    })
    const {updateSpecificOrder} = useOrders()
    const navigate = useNavigate()
    const {onOpen, onClose, isOpen} = useDisclosure()
    const {getProductsImages} = useOrders()
    const copy = useCopy()
    const {id, amount, products, createdAt, payer, address, status} = props.order

    const handleConfirm = () => {
        setLoading({...loading, confirm: true})
        updateSpecificOrder({...props.order, status: "delivered"})

        setTimeout(() => {
            setLoading({...loading, confirm: false})
        }, 500)
    }
    const handleCancel = () => {
        setLoading({...loading, cancel: true})
        updateSpecificOrder({...props.order, status: "canceled"})

        setTimeout(() => {
            setLoading({...loading, cancel: false})
        }, 500)
    }

    const handleReview = (data: { productId: string, color: string, size: string }) => {
        navigate(`/review/${data.productId}?color=${data.color}&size=${data.size}`)
    }

    return <>
        <Button
            variant={"outline"}
            colorScheme={"blackAlpha"}
            alignSelf="self-end"
            fontSize={14}
            size="sm"
            onClick={onOpen}
        >Order details</Button>
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader textAlign="center">Order Details</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Stack gap={2}>

                        {/* Order products */}
                        <TableContainer>
                            <Table size={'sm'} variant={'simple'}>
                                <Thead>
                                    <Tr>
                                        <Th>image</Th>
                                        <Th textAlign="center">Color</Th>
                                        <Th textAlign="center">Size</Th>
                                        <Th textAlign="center">Quantity</Th>
                                        <Th textAlign="center">Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {products.map((product, i) => (
                                        <Tr key={i}>
                                            <Td p={.5}><Image src={getProductsImages([product])[0]} alt={product.id}
                                                              maxW={70}/></Td>
                                            <Td textAlign="center">{product.color}</Td>
                                            <Td textAlign="center">{product.size}</Td>
                                            <Td textAlign="center">{product.quantity}</Td>
                                            <Td textAlign="center">
                                                {
                                                    status === "delivered" && <Button
                                                        size="sm"
                                                        fontWeight="bold"
                                                        variant="outline"
                                                        colorScheme="facebook"
                                                        leftIcon={<MdOutlineRateReview fontSize={18}/>}
                                                        onClick={() => handleReview({
                                                            productId: product.productID,
                                                            color: product.color,
                                                            size: product.size
                                                        })}
                                                    >
                                                        Add review
                                                    </Button>
                                                }
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>

                        {/* Order summary */}
                        <Stack alignSelf="end" maxW="250px" w="full" py={2}>
                            <HStack justifyContent="space-between">
                                <Text fontSize={14}>Sub Total: </Text>
                                <Text fontSize={14}>{formatCurrency(amount.totalPrice)}</Text>
                            </HStack>
                            <HStack justifyContent="space-between">
                                <Text fontWeight="bold">Total: </Text>
                                <Text fontWeight="bold">{formatCurrency(amount.totalPrice)}</Text>
                            </HStack>
                            <Divider borderWidth={1.5} borderColor="blackAlpha.500"/>
                        </Stack>

                        {/* Order information */}
                        <HStack>
                            <HStack alignItems="flex-start">
                                <VscLocation fontSize={24}/>
                                <Stack>
                                    <Text fontWeight="bold">Shipping Information</Text>
                                    <Divider/>
                                    <Box as="address">
                                        <Text as="pre">{payer.name} {payer?.phone}</Text>
                                        <Text as="pre">{address.addressLine}</Text>
                                        <Text as="pre">{address.city} {address.country} {address.zipCode}</Text>
                                    </Box>
                                </Stack>
                            </HStack>
                            <Spacer/>
                            <HStack alignItems="flex-start">
                                <AiOutlineFileProtect fontSize={24}/>
                                <Stack justifyContent="space-around">
                                    <HStack>
                                        <Text fontWeight="bold">Order Number: </Text>
                                        <Text
                                            cursor="pointer"
                                            _hover={{color: 'blue.500', transition: '0.5s'}}
                                            onClick={() => copy(id)}
                                        >
                                            {slicingFormat(id, 0, 22)}
                                        </Text>
                                    </HStack>
                                    <HStack>
                                        <Text fontWeight="bold">Order Date: </Text>
                                        <Text>{new Date(createdAt).toLocaleDateString()}</Text>
                                    </HStack>
                                    <HStack>
                                        <Text fontWeight="bold">Payment method: </Text>
                                        <Text>Credit/Debit Card</Text>
                                    </HStack>
                                </Stack>
                            </HStack>
                        </HStack>

                    </Stack>
                </ModalBody>

                <ModalFooter gap={2}>
                    {
                        status !== "canceled" && status !== "delivered" && <Button
                            size="sm"
                            w="full"
                            fontWeight="bold"
                            variant="outline"
                            colorScheme="green"
                            leftIcon={<GiConfirmed fontSize={18}/>}
                            onClick={handleConfirm}
                        >
                            {loading.confirm ? <Spinner/> : "Confirm order"}
                        </Button>
                    }

                    {
                        status !== "canceled" && status !== "delivered" && <Button
                            size="sm"
                            w="full"
                            fontWeight="bold"
                            variant="outline"
                            colorScheme="red"
                            leftIcon={<MdOutlineCancel fontSize={18}/>}
                            onClick={handleCancel}
                        >
                            {loading.cancel ? <Spinner/> : "Cancel order"}
                        </Button>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}
