import React, {Dispatch, FC, SetStateAction} from 'react';
import {Button, HStack, useMediaQuery} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {HiBars2, HiBars3, HiBars4} from "react-icons/all";

type TGenerateGridTemplate = {
   setGridTemplate: Dispatch<SetStateAction<number>>
}
export const GenerateGridTemplate: FC<TGenerateGridTemplate> = ({setGridTemplate}) => {

    const [isLargerThen480px] = useMediaQuery('(max-width: 480px)')

    return <HStack spacing={1}>
        {!isLargerThen480px && <Button
            size={'sm'}
            colorScheme={'black'}
            variant={'outline'}
            onClick={() => setGridTemplate(5)}
        >
            <Icon as={HiBars4} fontSize={20} transform={'rotate(90deg)'}/>
        </Button>}
        <Button
            size={'sm'}
            colorScheme={'black'}
            variant={'outline'}
            onClick={() => setGridTemplate(3)}
        >
            <Icon as={HiBars3} fontSize={20} transform={'rotate(90deg)'}/>
        </Button>
        {!isLargerThen480px && <Button
            size={'sm'}
            colorScheme={'black'}
            variant={'outline'}
            onClick={() => setGridTemplate(2)}
        >
            <Icon as={HiBars2} fontSize={20} transform={'rotate(90deg)'}/>
        </Button>}
        <Button
            size={'sm'}
            colorScheme={'black'}
            variant={'outline'}
            onClick={() => setGridTemplate(1)}
        >
            <Icon as={HiBars3} fontSize={20}/>
        </Button>
    </HStack>
}
