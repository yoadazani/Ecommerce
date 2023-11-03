import React, {FC} from 'react';
import {Avatar, Menu, MenuButton, MenuList, MenuItem, Text} from "@chakra-ui/react";
import {ConnectAccountModal} from "../modals/connectAccountModal";
import {Logout} from "./logout";
import {useSignOut} from "react-auth-kit";
import {Link} from "react-router-dom";

export const UserAvatar: FC = () => {
    const signOut = useSignOut()
    return <Menu>
        <MenuButton>
            <Avatar size='xs' src='https://bit.ly/broken-link'/>
        </MenuButton>
        <MenuList>
            <MenuItem borderBottomWidth={2} borderBottomColor={'blackAlpha.400'}>
                <ConnectAccountModal btnText={'sign-in / register'}/>
            </MenuItem>
            <MenuItem>
                <Link to={'/profile'}>
                    my profile
                </Link>
            </MenuItem>
            <MenuItem>
                <Link to={'/my-orders'}>
                    my orders
                </Link>
            </MenuItem>
            <MenuItem>
                <Logout w={"full"} cursor='pointer' onClick={signOut}/>
            </MenuItem>
        </MenuList>
    </Menu>
}
