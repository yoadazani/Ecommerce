import {Breadcrumb, BreadcrumbItem, BreadcrumbLink} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import React from "react";

export const PageBreadcrumb = (props: { title: string }) => {
    return <Breadcrumb
        fontWeight='medium'
        fontSize='sm'
        display={"flex"}
        justifyContent={"center"}
        bg={"white"} py={4} boxShadow={"sm"}
    >
        <BreadcrumbItem>
            <BreadcrumbLink as={Link} to='/'>
                Home
            </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
            <BreadcrumbLink isCurrentPage as={Link} to={`/${props.title}`}>
                {props.title}
            </BreadcrumbLink>
        </BreadcrumbItem>
    </Breadcrumb>
}