export interface IAddress {
    id: string
    userId: string
    city: string
    addressLine: string
    zipCode: string
    country: string
    createdAt: Date
    updatedAt: Date
}

export interface IUser {
    id: string
    provider: string
    userName: string
    email: string
    phone: string
    password: string
    role: string
    createdAt: Date
    updatedAt: Date
    address: IAddress[]
}
