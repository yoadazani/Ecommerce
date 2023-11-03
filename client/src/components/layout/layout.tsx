import React, {FC} from 'react';
import {NavBar} from "./navBar";
import {Outlet} from "react-router-dom";
import {Grid, GridItem} from "@chakra-ui/react";
import {Footer} from "./footer";

export const Layout: FC = () => {
    return <Grid templateColumns={'repeat(6, 1fr)'}>
        <GridItem colSpan={6} >
            <NavBar/>
        </GridItem>
        <GridItem bg={"whitesmoke"} colSpan={6} minH={'60vh'}>
            <Outlet/>
        </GridItem>
        <GridItem colSpan={6} >
            <Footer/>
        </GridItem>
    </Grid>
}