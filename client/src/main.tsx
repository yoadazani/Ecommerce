import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react'
import {theme} from "./theam";
import {BrowserRouter as Router} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {AuthProvider} from "react-auth-kit";
import {GoogleOAuthProvider} from "@react-oauth/google";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <AuthProvider
                        authType={'cookie'}
                        authName={'Authorization'}
                        cookieDomain={window.location.hostname}
                        cookieSecure={window.location.protocol === "https:"}
                    >
                        <Router>
                            <App/>
                        </Router>
                    </AuthProvider>
                </GoogleOAuthProvider>
            </ChakraProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </React.StrictMode>,
)
