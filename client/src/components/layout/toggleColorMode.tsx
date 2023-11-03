import {FC} from 'react';
import {Stack, useColorMode} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {BsFillSunFill, BsMoonStarsFill} from "react-icons/all";

export const ToggleColorMode: FC = () => {

    const {colorMode, toggleColorMode} = useColorMode()

    return <>
        <Stack
            py={2}
            align={"center"}
            cursor={'pointer'}
            onClick={toggleColorMode}
        >
            {colorMode === 'light'
                ? <Icon fontSize={18} as={BsMoonStarsFill} color={'darkBlue'}/>
                : <Icon fontSize={18} as={BsFillSunFill} color={'gold'}/>
            }
        </Stack>
    </>
}