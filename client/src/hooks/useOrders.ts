import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useAuthUser} from "react-auth-kit";
import {getOrders, addNewOrder, cancelOrder, updateOrder} from "../api/ordersApi";
import {IOrders} from "../interfaces/IOrders.interface";
import {IProducts} from "../interfaces/Iproducts.interface";
import {useProducts} from "./useProducts";
import {IShoppingCartItem} from "../interfaces/IShoppingCartItem.interface";

export const useOrders = () => {

    const queryClient = useQueryClient()
    const auth = useAuthUser()
    const {productsArray} = useProducts()

    const {
        data: ordersList,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['orders', {userID: auth()?.id}],
        queryFn: () => getOrders(auth()?.id),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10,
        enabled: true
    })


    const getProductsImages = (products: IShoppingCartItem[]) => {
        let images: string[] = []
        products.forEach((product) => {
            const currentProduct = productsArray.find((p: IProducts) => p.id === product.productID)
            const img = currentProduct?.picture[0]
            images.push(img)
        })
        return images
    }

    const {mutate: addOrder} = useMutation({
        mutationFn: addNewOrder,
        onSuccess: () => {
            return queryClient.invalidateQueries(['orders'])
        }
    })

    const {mutate: updateSpecificOrder} = useMutation({
        mutationFn: updateOrder,
        onMutate: (order: IOrders) => {
            queryClient.setQueryData(['orders', order.id], order)
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['orders'])
        }
    })

    const {mutate: cancelSpecificOrder} = useMutation({
        mutationFn:(order: IOrders) => cancelOrder(order),
        onMutate: (order: IOrders) => {
            queryClient.cancelQueries(['orders', order.id]).then()

            const prevData = queryClient.getQueryData(['orders', order.id])

            if (prevData) {
                queryClient.setQueryData(['orders', order.id], order)
            }
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['orders'])
        }
    })


    return {
        ordersList,
        isLoading,
        isError,
        error,
        addOrder,
        updateSpecificOrder,
        cancelSpecificOrder,
        getProductsImages
    }
}
