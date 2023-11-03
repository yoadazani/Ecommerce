import React, {createContext, Dispatch, FC, MouseEventHandler, useEffect, useState} from 'react';
import {useDisclosure} from "@chakra-ui/react";

type SimilarItems = {
    isOpen: boolean,
    onOpen: () => void
    onClose: () => void
    onToggle: MouseEventHandler<HTMLButtonElement>
    setId: (id: string) => void
    categoryID: string | undefined
}

export const similarItemsProvider = createContext({} as SimilarItems)

export const SimilarItemsProvider: FC<any> = ({children}) => {

    const {isOpen, onOpen, onClose, onToggle} = useDisclosure()
    const [categoryID, setCategoryID] = useState<string>()

    const setId = (id: string) => {
        setCategoryID(id)
    }

    return <similarItemsProvider.Provider value={{
        isOpen,
        onOpen,
        onClose,
        onToggle,
        setId,
        categoryID
    }}>
        {children}
    </similarItemsProvider.Provider>
}