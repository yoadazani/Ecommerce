import {useQuery} from "@tanstack/react-query";
import {getUser} from "../api/usersApi";
import {useAuthUser} from "react-auth-kit";

export const useUserInfo = () => {

    const auth = useAuthUser()

    const {
        data: userInfo,
        isError,
        error,
        isLoading
    } = useQuery({
        queryKey: ['userInfo'],
        queryFn:() => getUser(auth()?.id),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10
    })

    return {
        userInfo,
        isError,
        isLoading,
        error
    }

}
