import React, {FormEvent, useContext, useEffect, useState} from "react";
import {LinkAuthenticationElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {StripePaymentElementOptions} from "@stripe/stripe-js";
import {Button, FormControl, Spinner, Text} from "@chakra-ui/react";
import {orderProvider} from "../../../context/orderProvider";
import {useOrders} from "../../../hooks/useOrders";
import {useProducts} from "../../../hooks/useProducts";
import {IProducts} from "../../../interfaces/Iproducts.interface";
import {IOrders} from "../../../interfaces/IOrders.interface";
import {IShoppingCartItem} from "../../../interfaces/IShoppingCartItem.interface";

export const StripeForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {orderId} = useContext(orderProvider);
    const {updateSpecificOrder, ordersList} = useOrders();
    const {productsArray, updateSpecificProduct} = useProducts();
    useEffect(() => {
        if (!stripe) return

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) return

        stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    function getCurrentOrder() {
        return ordersList?.find(order => order.id === orderId);
    }

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return

        setIsLoading(true);

        const order = getCurrentOrder();
        if (!order) return

        updateSpecificOrder({
            ...order,
            status: "active",
        })
        updateAmountAndSold(order.products, "active");

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `https://127.0.0.1:5173/payment-succeeded?orderId=${orderId}`,
            }
        })

        setMessage(error?.message ?? "Payment failed.");

        updateSpecificOrder({
            ...order,
            status: "unpaid",
        })
        updateAmountAndSold(order.products, "unpaid");

        setIsLoading(false)
    };

    const paymentElementOptions: StripePaymentElementOptions = {
        layout: "tabs"
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement
                id="link-authentication-element"
            />
            <PaymentElement id="payment-element" options={paymentElementOptions}/>

            <FormControl my={3}>
                <Button
                    disabled={isLoading || !stripe || !elements}
                    colorScheme={'black'}
                    color={'beige'}
                    bg={'#131928'}
                    w={'50%'}
                    mx={'auto'}
                    rounded={'full'}
                    type='submit'
                >
                    {isLoading ? <Spinner/> : "Pay now"}
                </Button>
            </FormControl>
            {/* Show any error or success messages */}
            {message && <Text id="payment-message">{message}</Text>}
        </form>
    );
}
