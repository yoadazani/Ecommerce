import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteUser, getUser, getUsers, postUser, updateUser} from "../api/usersApi";
import {IUser} from "../interfaces/IUser.interface";
import {useGenerateToken} from "./useGenerateToken";
import {LoginStatus, validateLogin} from "../utilities/loginValidation";
import {useToastMessages} from "./useToastMessages";

export const useLogin = () => {

    const queryClient = useQueryClient()
    const {generateToken} = useGenerateToken()
    const {ErrorToast, SuccessToast} = useToastMessages()
    const {
        data: usersData,
        isError,
        error,
        isLoading
    } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10
    })

    const {mutate: login} = useMutation({
        mutationFn: (values: { email: string, password: string }): any => {
            const validated = validateLogin((usersData || []), values as IUser)
            if (validated === LoginStatus.Failed) {
                return ErrorToast("Invalid email or password")
            }
            generateToken(values.email).then()
            return SuccessToast("Logged in successfully")
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['users'])
        }
    })

    const {mutate: register} = useMutation({
        mutationFn: (user: IUser) => {
            let userExist = usersData?.find(u => u.email === user.email);

            if (!userExist && user.provider === "google") {
                return postUser(user).then(res => {
                    generateToken(res.email).then()
                })
            } else if (userExist && user.provider === "google") {
                return generateToken(userExist.email)
            }

            return postUser(user)
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['users'])
        }
    })

    const {mutate: updateSpecificUser} = useMutation({
        mutationFn: updateUser,
        onMutate: (userData: IUser) => {
            return queryClient.setQueryData(['users', userData.id], userData)
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['users'])
        }
    })

    const {mutate: deleteSpecificUser} = useMutation({
        mutationFn: deleteUser,
        onMutate: (id) => {
            return queryClient.cancelQueries(['users', id])
        },
        onSuccess: (id) => {
            return queryClient.invalidateQueries(['users', id])
        }
    })

    return {
        usersData,
        isError,
        error,
        isLoading,
        login,
        register,
        updateSpecificUser,
        deleteSpecificUser
    }
}
