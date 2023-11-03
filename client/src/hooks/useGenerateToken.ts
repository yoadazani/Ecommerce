import axios from "axios";
import {useSignIn} from "react-auth-kit";
import {createToken} from "../api/usersApi";

export const useGenerateToken = () => {

    const signIn = useSignIn()
    const generateToken = async (email: string) => {
        const res = await createToken(email)
        signIn({
            token: res.token,
            expiresIn: res.expiresIn,
            tokenType: "Bearer",
            authState: res.user
        })
    }

    return {generateToken}
}
