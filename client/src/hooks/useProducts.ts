import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getProducts, updateProduct} from "../api/productsApi";

export const useProducts = () => {

    const queryClient = useQueryClient()
    const {
        data: productsArray,
        isError,
        error,
        isLoading
    } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10
    })

    const {mutate: updateSpecificProduct} = useMutation({
        mutationFn: updateProduct,
        onMutate: (data) => {
            return queryClient.setQueryData(['products', data.id], productsArray)
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['products'])
        }
    })

    return {
        updateSpecificProduct,
        productsArray,
        isError,
        error,
        isLoading
    }
}
