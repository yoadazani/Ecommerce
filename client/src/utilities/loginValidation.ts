import {IUser} from "../interfaces/IUser.interface";


export enum LoginStatus {
    Success = "success",
    Failed = "failed"
}

export const validateLogin = (allUsers: IUser[], values: { email: string, password: string}): LoginStatus => {

    if (!allUsers) return LoginStatus.Failed

    const user = allUsers?.find(u =>
        u.email === values.email &&
        u.password === values.password
    )

    if (!user) return LoginStatus.Failed

    return LoginStatus.Success
}
