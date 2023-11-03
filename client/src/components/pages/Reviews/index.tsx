import {Button, Container, Heading, HStack, Spinner, Stack, Text, Textarea} from "@chakra-ui/react";
import {useParams, useSearchParams} from "react-router-dom";
import {useProducts} from "../../../hooks/useProducts";
import {IProducts} from "../../../interfaces/Iproducts.interface";
import {PageBreadcrumb} from "../../customComps/pageBreadcrumb";
import {AiFillStar} from "react-icons/all";
import {Icon} from "@chakra-ui/icons";
import React, {useEffect} from "react";
import {formatCurrency} from "../../../utilities/formatCurrency";
import {ImagesGallery} from "../../customComps/imagesGallery";
import {IReviews} from "../../../interfaces/Ireviews.interface";
import {v4 as uuidV4} from "uuid";
import {useAuthUser} from "react-auth-kit";
import {useToastMessages} from "../../../hooks/useToastMessages";
import {useUserInfo} from "../../../hooks/useUserData";

const AddReview = () => {
    const auth = useAuthUser()
    const {userInfo} = useUserInfo()
    const {SuccessToast, ErrorToast} = useToastMessages()
    const params = useParams()
    const [queryString, setQueryString] = useSearchParams()
    const {productsArray, isError, error, isLoading, updateSpecificProduct} = useProducts()
    const product = productsArray?.find((p: IProducts) => p.id === params.productId)
    const [review, setReview] = React.useState<IReviews>({
        id: uuidV4(),
        userId: userInfo?.id,
        productId: params?.productId,
        name: userInfo?.userName,
        color: queryString?.get("color") || "",
        size: queryString?.get("size") || "",
        rating: 0,
        comment: "",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
    } as IReviews)
    const handleUpdateReview = (name: string, value: string | number) => {
        setReview({...review, [name]: value})
    }

    const handleSubmit = () => {
        if (!product) {
            ErrorToast("Product not found")
            return
        }
        if (review.rating < 1 || review.comment === "") {
            ErrorToast("Please fill all fields")
            return
        }
        const rating = product.reviews?.reduce((acc: number, cur: IReviews) => acc + cur.rating, 0)
        updateSpecificProduct({...product, reviews: [...product?.reviews, review], rating: (rating + review.rating) / (product.reviews?.length + 1)})
        SuccessToast("Review added successfully")
    }

    if (isError) return <div>{JSON.stringify(error)}</div>
    if (isLoading) return <Spinner/>

    return <>
        <PageBreadcrumb title={`review/${params.productId}`}/>
        <Container maxW="container.xl" py={2}>
            <Heading fontSize={26} textAlign={"center"}>Add Review</Heading>

            <HStack alignItems="flex-start" py={5} spacing={5} justifyContent="center">
                {product && <ImagesGallery images={(product?.picture || [])}/>}
                <Stack gap={8}>
                    <Text>
                        {product?.productName}
                    </Text>
                    <Text fontWeight="bolder">
                        {formatCurrency(product?.price)}
                    </Text>
                    <Textarea
                        name={"comment"}
                        resize="none"
                        cols={45}
                        rows={5}
                        placeholder="Add a comment..."
                        onChange={(e) => handleUpdateReview("comment", e.target.value)}
                    />

                    <Stack>
                        <Text fontWeight="bold" pt={5}>Review: </Text>
                        <HStack>
                            {Array.from({length: 5}).map((_, i) => {
                                return <Icon
                                    key={i}
                                    color={i < review.rating ? "gold" : "blackAlpha.300"}
                                    fontSize={22}
                                    as={AiFillStar}
                                    onClick={() => handleUpdateReview("rating", i + 1)}
                                />
                            })}
                        </HStack>
                    </Stack>
                    <Button
                        size="sm"
                        fontWeight="bold"
                        variant="outline"
                        colorScheme="facebook"
                        onClick={handleSubmit}
                    >
                        Add review
                    </Button>
                </Stack>
            </HStack>
        </Container>;
    </>
}

export default AddReview;
