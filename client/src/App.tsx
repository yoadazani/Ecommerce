import './App.css'
import React, {FC, lazy, Suspense} from "react";
import {Box} from "@chakra-ui/react";
import {Routes, Route} from 'react-router-dom'
import {Home} from "./components/pages/Home/home";
import {Layout} from "./components/layout/layout";
import {Settings} from "./components/pages/Settings/settings";
import {Store} from "./components/pages/Store/store";
import {SpecificItem} from "./components/pages/SpecificItem/specificItem";
import {ShoppingCart} from "./components/pages/Cart/shoppingCart";
import {WishList} from "./components/pages/WishList/wishList";
import {EmailVerification} from "./components/layout/emailVerification";
import {ResetPassword} from "./components/layout/resetPassword";
import {LoginForm} from "./components/layout/loginForm";
import {RegisterForm} from "./components/layout/registerForm";
import {Orders} from "./components/pages/Orders/orders";
import {StripePayment} from "./components/pages/Cart/stripePayment";
import {PaymentSucceeded} from "./components/pages/Cart/paymentSucceeded";
import AddReview from "./components/pages/Reviews";

const App: FC = () => {


    return (
        <Box position='relative' minH={'91.5vh'}>
                <Routes>
                    <Route path={'/'} element={<Layout/>}>
                        <Route index path={'/'} element={<Home/>}/>
                        <Route path={'/favourites'} element={<WishList/>}/>
                        <Route path={'/shoppingCart'} element={<ShoppingCart/>}/>
                        <Route path={'/settings'} element={<Settings/>}/>
                        <Route path={'/profile'} element={<Settings/>}/>
                        <Route path={'/store'} element={<Store/>}/>
                        <Route path={'/store/item/:id'} element={<SpecificItem/>}/>
                        <Route path={'/my-orders'} element={<Orders/>}/>
                        <Route path={'/review/:productId'} element={<AddReview/>}/>
                        <Route path={'/checkout'} element={<StripePayment/>}/>
                        <Route path={'/payment-succeeded'} element={<PaymentSucceeded/>}/>

                        {/*authentication routes*/}
                        <Route path={'/auth/email-verification'} element={<EmailVerification/>}/>
                        <Route path={'/auth/reset-password'} element={<ResetPassword/>}/>
                        <Route path={'/auth/login'} element={<LoginForm/>}/>
                        <Route path={'/auth/register'} element={<RegisterForm/>}/>
                    </Route>
                </Routes>
        </Box>
    )
}

export default App
