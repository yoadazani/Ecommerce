import React, {useCallback} from 'react';
import {Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {useSearchParams} from "react-router-dom";

type TSortedByOptions = {
    label: any,
    value: string
}
const sortedByOptions: Array<TSortedByOptions> = [
    {label: 'Unsorted', value: 'Unsorted'},
    {label: 'Recommended', value: 'Recommended'},
    {label: 'Recently Added', value: 'Recently Added'},
    {label: 'Price Low To High', value: 'Price Low To High'},
    {label: 'Price High To Low', value: 'Price High To Low'}
]
export const SortBy = () => {

    const [sortByParams, setSortByParams] = useSearchParams()

    const handleSortBy = useCallback((sortType: string) => {
        if (sortType === "Unsorted" && sortByParams.has("sortBy")) {
            sortByParams.delete("sortBy")
            setSortByParams(sortByParams)
            return
        }
        sortByParams.set("sortBy", sortType)
        setSortByParams(sortByParams)
    }, [sortByParams])

    return <Menu>
        <MenuButton
            as={Button}
            size={'sm'}
            rounded={0}
            colorScheme={'black'}
            variant={'outline'}
            rightIcon={<ChevronDownIcon fontSize={24}/>}
        >
            {
                sortByParams.has("sortBy")
                    ? sortByParams.get("sortBy")
                    : "Sort by"
            }
        </MenuButton>
        <MenuList>
            {sortedByOptions.map((option, i) => {
                return <MenuItem
                    key={option.label}
                    onClick={() => handleSortBy(option.value)}
                >
                    {option.value}
                </MenuItem>
            })}

        </MenuList>
    </Menu>
}
