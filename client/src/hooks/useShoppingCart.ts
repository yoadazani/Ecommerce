import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    addToSoppingCartItems,
    deleteSoppingCartItems,
    getSoppingCartItems, updateAllSoppingCartItems,
    updateSoppingCartItems
} from "../api/shoppingCartApi";
import {IShoppingCartItem} from "../interfaces/IShoppingCartItem.interface";
import {useAuthUser} from "react-auth-kit";

export const useShoppingCart = () => {

    const queryClient = useQueryClient()
    const auth = useAuthUser()
    const {
        data: shoppingCartData,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['shoppingCart', {userID: auth()?.id}],
        queryFn:() => getSoppingCartItems(auth()?.id),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10,
        enabled: true
    })

    const cartQuantity: number = (shoppingCartData || [])
        .reduce((quantity, item) =>
            item.quantity + quantity, 0
        )

    const {mutate: addToCart} = useMutation({
        mutationFn: (newItem: IShoppingCartItem): Promise<IShoppingCartItem | undefined> => {

            let item: IShoppingCartItem | undefined = (shoppingCartData || []).find(currentItem =>
                currentItem.productID === newItem.productID &&
                currentItem.color === newItem.color &&
                currentItem.size === newItem.size
            )
            if (!item) return addToSoppingCartItems(newItem)
            return updateSoppingCartItems({...item, quantity: item.quantity + 1})
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['shoppingCart'])
        }
    })

    const {mutate: deleteCartItem} = useMutation({
        mutationFn: deleteSoppingCartItems,
        onMutate: (id) => {
            return queryClient.cancelQueries(['shoppingCart', id])
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['shoppingCart'])
        }
    })

    const {mutate: updateCartItem} = useMutation({
        mutationFn: (item: IShoppingCartItem) => {
            return (item.quantity === 0)
                ? deleteSoppingCartItems(item.id)
                : updateSoppingCartItems(item)
        },
        onMutate: (item) => {
            queryClient.cancelQueries(['shoppingCart', item.id]).then()

            const prevData = queryClient.getQueryData(['shoppingCart', item.id])

            if (prevData) {
                queryClient.setQueryData(['shoppingCart', item.id], item)
            }
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['shoppingCart'])
        },
    })

    const {mutate: updateAllCartItems} = useMutation({
        mutationFn: updateAllSoppingCartItems,
        onMutate: (items) => {
            return queryClient.setQueryData(['shoppingCart'], items)
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['shoppingCart'])
        }
    })

    return {
        shoppingCartData,
        isLoading,
        isError,
        error,
        cartQuantity,
        addToCart,
        deleteCartItem,
        updateCartItem,
        updateAllCartItems
    }
}
