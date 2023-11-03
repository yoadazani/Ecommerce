import {FC} from "react";
import {IProducts} from "../../interfaces/Iproducts.interface";
import {useNavigate} from "react-router-dom";
import {
    Card,
    CardBody,
    CardHeader,
    CardProps,
    HStack,
    Image, Spacer,
    Stack,
    Text,
    useMediaQuery
} from "@chakra-ui/react";
import {slicingFormat} from "../../utilities/stringSlicingFormat";
import {formatCurrency} from "../../utilities/formatCurrency";
import {Icon} from "@chakra-ui/icons";
import {AiFillHeart, AiFillStar} from "react-icons/all";
import {FavouritesButton} from "./favouritesButton";
import {useWishList} from "../../hooks/useWishList";
import {v4 as uuidV4} from "uuid";
import {useAuthUser, useIsAuthenticated} from "react-auth-kit";
import {useToastMessages} from "../../hooks/useToastMessages";

interface cardProps extends CardProps {
    product: IProducts
}

export const ProductCard: FC<cardProps> = ({product, ...rest}) => {

    const navigate = useNavigate()
    const [isLargerThen480] = useMediaQuery('(min-width: 480px)')
    const isAuthenticated = useIsAuthenticated()
    const {ErrorToast} = useToastMessages()
    const auth = useAuthUser()
    const {
        deleteFromWishList,
        addToWishList,
        wishListData
    } = useWishList()

    const navigateToCurrentPage = () => {
        navigate(`/store/item/${product.id}`)
        window.scroll(0, 100)
    }

    const handleFavorites = () => {
        if (!isAuthenticated()) return ErrorToast('You must be logged in to add to favorites')
        let existingItem = wishListData?.find(i => i.productID === product.id)
        if (existingItem) return deleteFromWishList(existingItem)
        console.log(auth())
        addToWishList({
            id: uuidV4(),
            userID: auth()?.id,
            productID: product.id,
            color: product.colors[0],
            size: product.sizes[0]
        })
    }

    return <Card {...rest}>
        <CardHeader pos={"relative"} p={0}>
                <Image
                    borderRadius={'md'}
                    objectPosition={'center'}
                    objectFit={'cover'}
                    src={product.picture[0]}
                    alt={product.productName}
                />
            <Text
                color={'blackAlpha.600'}
                fontSize={14}
                cursor={"pointer"}
                _hover={{transition: '.5s', color: 'blackAlpha.700'}}
                onClick={navigateToCurrentPage}
            >
                {slicingFormat(product.productName, 0, (isLargerThen480 ? 20 : 16))}
            </Text>
            <FavouritesButton
                pos={"absolute"}
                top={1}
                right={1}
                cursor={"pointer"}
                color={
                    wishListData?.find(i => i.productID === product.id)
                        ? "black"
                        : "blackAlpha.400"
                }
                icon={AiFillHeart}
                onClick={handleFavorites}
            />
        </CardHeader>
        <CardBody px={1} py={0}>
            <Stack>
                <HStack>
                    <Text fontWeight={'bold'}>{formatCurrency(product.price)}</Text>
                    <Spacer/>
                    <HStack spacing={0}>
                        {Array.from({length: product.rating},
                            (_, i) => i + 1).map((i) => (
                            <Icon key={i} color={"gold"} as={AiFillStar}/>
                        ))}
                    </HStack>
                </HStack>
            </Stack>
        </CardBody>
    </Card>;

}
