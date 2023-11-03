import axios from "axios";
import baseUrl from "./baseUrl";

interface values {
    email: string,
    pinCode: number
}
export const confirmEmail = async (emailData: values) => {
    const response = await baseUrl.post('/email-confirmation', emailData)
    return response.data
}
