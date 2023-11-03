import {FC, useContext} from 'react';
import {v4 as uuidV4} from "uuid";
import {
    PayPalButtons,
    PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import {useAuthUser} from "react-auth-kit";
import {useOrders} from "../../../hooks/useOrders";
import {IOrders} from "../../../interfaces/IOrders.interface";
import {orderProvider} from "../../../context/orderProvider";
import {IProducts} from "../../../interfaces/Iproducts.interface";
import {useProducts} from "../../../hooks/useProducts";
import {IShoppingCartItem} from "../../../interfaces/IShoppingCartItem.interface";

export const PaypalPayment: FC = () => {


    const {amount, orderList} = useContext(orderProvider)
    const {addOrder} = useOrders()
    const {productsArray, updateSpecificProduct} = useProducts();

    const auth = useAuthUser()

    function updateAmountAndSold(products: IShoppingCartItem[], status: string) {
        for (let i = 0; i < products.length; i++) {
            const cartProduct = products[i]
            const product = productsArray?.find((p: IProducts) => p.id === cartProduct.productID)
            updateSpecificProduct({
                ...product,
                salesAmount: (status === "active"
                        ? product.salesAmount + cartProduct.quantity
                        : product.salesAmount - cartProduct.quantity
                ),
                amount: (status === "active"
                        ? product.amount - cartProduct.quantity
                        : product.amount + cartProduct.quantity
                )
            })
        }
    }

    return <PayPalScriptProvider
        options={{
            "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
            currency: "USD",
            intent: "capture"
        }}
    >
        <PayPalButtons
            style={{"layout": "horizontal"}}
            forceReRender={[amount]}
            createOrder={(_data, actions) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            amount: {
                                value: `${amount.toFixed(2)}`
                            }
                        }
                    ]
                })
            }}
            onApprove={(_data, actions) => {
                actions.order?.capture().then((details) => {
                    addOrder({
                        id: uuidV4(),
                        status: "active",
                        userId: auth()?.id,
                        payer: {
                            name: details.purchase_units[0].shipping?.name?.full_name,
                            email: details.payer.email_address,
                            phone: details.payer.phone?.phone_number.national_number
                        },
                        address: {
                            id: uuidV4(),
                            userId: auth()?.id,
                            city: details.purchase_units[0].shipping?.address?.admin_area_2,
                            addressLine: details.purchase_units[0].shipping?.address?.address_line_1,
                            zipCode: details.purchase_units[0].shipping?.address?.postal_code,
                            country: details.purchase_units[0].shipping?.address?.country_code,
                            createdAt: new Date(Date.now()),
                            updatedAt: new Date(Date.now())
                        },
                        amount: {
                            totalPrice: details.purchase_units[0].amount?.value,
                            currency: details.purchase_units[0].amount?.currency_code
                        },
                        createdAt: details.create_time,
                        updatedAt: details.update_time,
                        products: orderList
                    } as unknown as IOrders);
                })
                alert("your payment was successful")
                updateAmountAndSold( orderList, "active")
                return Promise.resolve()
            }}
            onError={(error) => {
                alert("something went wrong" + error)
            }}
        />
    </PayPalScriptProvider>
}
