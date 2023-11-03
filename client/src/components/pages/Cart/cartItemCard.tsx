import {FC, useState} from "react";
import {IShoppingCartItem} from "../../../interfaces/IShoppingCartItem.interface";
import {
    HStack, Image, Stack,
    Text, useMediaQuery, Checkbox, Divider, Spacer, Spinner
} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {AiFillHeart, BsTrash} from "react-icons/all";
import {slicingFormat} from "../../../utilities/stringSlicingFormat";
import {SelectedSizeAndColor} from "./selectedSizeAndColor";
import {formatCurrency} from "../../../utilities/formatCurrency";
import {IncreaseAndDecrease} from "./increaseAndDecrease";
import {useShoppingCart} from "../../../hooks/useShoppingCart";
import {useWishList} from "../../../hooks/useWishList";
import {useProducts} from "../../../hooks/useProducts";
import {IProducts} from "../../../interfaces/Iproducts.interface";
import {useNavigate} from "react-router-dom";
import {v4 as uuidV4} from "uuid";
import {useAuthUser} from "react-auth-kit";

type TCartItemCard = {
    item: IShoppingCartItem
}
export const CartItemCard: FC<TCartItemCard> = ({item}) => {

    const navigate = useNavigate()
    const [isLargerThen441] = useMediaQuery('(min-width: 441px)')
    const {addToWishList} = useWishList()
    const {productsArray} = useProducts()
    const {deleteCartItem, updateCartItem} = useShoppingCart()
    const cartItem = productsArray?.find((i: IProducts) => i.id === item.productID)
    const [loading, setLoading] = useState(false)
    const auth = useAuthUser()

    const navigateToCurrentPage = () => navigate(`/store/item/${cartItem.id}`)
    const handleDelete = () => {
        setLoading(true)
        setTimeout(() => {
            deleteCartItem(item.id)
            setLoading(false)
        }, 1000)
    }
    const handleMoveToWishList = () => {
        setLoading(true)
        setTimeout(() => {
            addToWishList({
                id: uuidV4(),
                userID: auth()?.id,
                productID: cartItem.id,
                color: cartItem.color,
                size: cartItem.size
            })
            deleteCartItem(item.id)
            setLoading(false)
        }, 1000)
    }


    return <>
        <HStack px={2} align={'flex-start'} pos={"relative"} opacity={loading ? 0.5 : 1}>
            {loading && <Spinner pos={'absolute'} top={'35%'} left={'50%'}/>}
            <Checkbox
                isChecked={item.isChecked}
                onChange={e => updateCartItem({
                    ...item,
                    isChecked: e.target.checked
                })}
            />
            <Image
                objectFit='cover'
                maxW={'100px'}
                width={'98%'}
                src={cartItem?.picture[0]}
                alt='item image'
                onClick={navigateToCurrentPage}
            />
            <Stack gap={3}>
                <Text fontSize={14} pr={5}>
                    {slicingFormat(
                        (cartItem?.productName || ''), 0, (isLargerThen441
                                ? (cartItem?.productName.length || 0)
                                : 20
                        )
                    )}
                </Text>
                <SelectedSizeAndColor selectedColor={item.color} selectedSize={item.size}/>
                <HStack justify={'space-between'} maxW={'200px'}>
                    <Text fontWeight={"bold"}>
                        {formatCurrency((cartItem?.price || 0) * item.quantity)}
                    </Text>
                    <IncreaseAndDecrease cartItem={item}/>
                </HStack>
            </Stack>
            <Spacer/>
            <Icon as={BsTrash} cursor={'pointer'} onClick={handleDelete}/>
            <Icon as={AiFillHeart} cursor={'pointer'} onClick={handleMoveToWishList}/>
        </HStack>
        <Divider/>
    </>
}
