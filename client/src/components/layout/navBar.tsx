import React, {FC, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {
    Box,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Button,
    Flex, Text, Spacer, HStack, Stack, Divider, useMediaQuery, Heading
} from "@chakra-ui/react";
import {
    FiHome,
    FiCompass,
    FiStar,
    FiSettings
} from 'react-icons/fi'
import {HamburgerIcon, Icon} from '@chakra-ui/icons';
import {Search} from "./TSearch";
import {ToggleColorMode} from "./toggleColorMode";
import {UserAvatar} from "./userAvater";
import {Categories} from "../pages/Home/categories";
import {FavouritesButton} from "../customComps/favouritesButton";
import {CartIcon} from "../pages/Cart/cartIcon";
import {AiOutlineHeart, CgMenuGridO} from "react-icons/all";
import {useWishList} from "../../hooks/useWishList";
import {ILinkItem} from "../../interfaces/ILinkItem.interface";
import {INavItem} from "../../interfaces/INavItem.interface";
import {useShoppingCart} from "../../hooks/useShoppingCart";


const linkItem: Array<ILinkItem> = [
    {id: 1, name: 'CATEGORIES', path: 'Categories', icon: CgMenuGridO},
    {id: 2, name: 'HOME', path: '', icon: FiHome},
    {id: 3, name: 'STORE', path: 'Store', icon: FiCompass},
    {id: 4, name: 'FAVORITES', path: 'Favourites', icon: FiStar},
    {id: 5, name: 'SETTINGS', path: 'Settings', icon: FiSettings}
]

type TNavLinks = {
    navigationType: string
}
const NavLinks: FC<TNavLinks> = ({navigationType}) => {
    return <>
        {linkItem.map(link => {
            return link.name !== 'CATEGORIES'
                ? <NavItem
                    key={link.id}
                    icon={navigationType !== 'top' ? link.icon : undefined}
                    path={link.path}
                    children={link.name}
                />
                : <Categories
                    key={link.id}
                    name={link.name as string}
                    navigationType={navigationType}
                    icon={link.icon}
                />
        })}
    </>
}
const NavItem: FC<INavItem> = (props: INavItem) => {
    return <Link to={`/${props.path}`}>
        <HStack
            p="2"
            borderRadius="lg"
            role="group"
            cursor="pointer"
        >
            {props.icon && <Icon fontSize="20" as={props.icon}/>}
            <Text fontSize={14}>
                {props.children}
            </Text>
        </HStack>
    </Link>
}

const SideBar: FC = () => {

    const [isOpen, setIsOpen] = useState(false);

    return <>
        <Button color={"whitesmoke"} variant={"unstyled"} onClick={() => setIsOpen(!isOpen)}>
            <HamburgerIcon/>
        </Button>
        <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={() => setIsOpen(false)}
        >
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader mt={10}>
                        <Search setIsOpen={setIsOpen}/>
                    </DrawerHeader>
                    <Divider/>
                    <DrawerBody>
                        <Stack gap={2}>
                            <NavLinks navigationType={'side'}/>
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    </>
};

export const NavBar: FC = () => {

    const navigate = useNavigate()
    const {cartQuantity} = useShoppingCart()
    const {wishListQuantity} = useWishList()
    const [isLargerThen768px] = useMediaQuery('(min-width: 768px)')

    return <>
        <HStack
            py={2}
            bg={"#131923"}
            color={"whitesmoke"}
            justify={"space-between"}
            px={{base: '1rem', sm: "2rem", md: '4rem'}}
        >
            <Heading
                fontSize={{base: 18, md: 26}}
            >
                Dev Corner
            </Heading>
            <Box
                w={"full"}
                maxW={'50%'}
                display={{base: 'none', md: 'block'}}
            >
                <Search/>
            </Box>
            <HStack>
                <Text
                    fontSize={"sm"}
                    fontWeight={"bold"}
                >
                    Hotline:
                </Text>
                <Button
                    as={'a'}
                    size={"xs"}
                    pt={1}
                    variant={'unstyled'}
                    href={'tel:+972-549108919'}
                >
                    +972-549108919
                </Button>
            </HStack>
        </HStack>
        <Divider borderColor={"gray.900"}/>
        <Flex
            align={"center"}
            bg={"#131928"}
            py={'2px'}
            px={{base: '1rem', md: '2rem'}}
        >
            {
                !isLargerThen768px
                    ? <SideBar/>
                    : <HStack align={"flex-start"} color={"whitesmoke"} py={1}>
                        <NavLinks navigationType={'top'}/>
                    </HStack>
            }

            <Spacer/>

            <HStack spacing={'30px'}>
                <ToggleColorMode/>
                <HStack color={"gray.400"} onClick={() => navigate('/shoppingCart')}>
                    <CartIcon/>
                    <Text fontWeight={"bold"}>
                        {cartQuantity}
                    </Text>
                </HStack>
                <HStack color={"gray.400"} onClick={() => navigate('/favourites')}>
                    <FavouritesButton fontSize={25} icon={AiOutlineHeart}/>
                    <Text fontWeight={"bold"}>
                        {wishListQuantity}
                    </Text>
                </HStack>
                <UserAvatar/>
            </HStack>
        </Flex>
    </>
}
