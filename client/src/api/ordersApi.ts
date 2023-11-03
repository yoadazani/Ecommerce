import {IOrders} from "../interfaces/IOrders.interface";
import baseUrl from "./baseUrl";

export const getOrders = async (userID: string): Promise<IOrders[]> => {
    try {
        const res = await baseUrl.get(`/orders?userId=${userID}`)
        return res.data
    } catch (err: Error | any) {
        console.log(err?.message)
        return Promise.reject(err)
    }
}

export const addNewOrder = async (order: IOrders): Promise<IOrders | undefined> => {
    try {
        const res = await baseUrl.post('orders', order)
        return res.data
    } catch (err: Error | any) {
        console.log(err?.message)
    }
}

export const updateOrder = async (order: IOrders): Promise<IOrders | undefined> => {
    try {
        const res = await baseUrl.put(`orders/${order.id}`, order)
        return res.data
    } catch (err: Error | any) {
        console.log(err?.message)
    }
}

export const cancelOrder = async (order: IOrders): Promise<IOrders> => {
    const res = await baseUrl.put(`/orders/${order.id}`, {...order, status: "canceled"})
    return res.data
}
