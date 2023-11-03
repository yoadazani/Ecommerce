import React, {FC} from "react";
import {Box, Stack, Text} from "@chakra-ui/react";

interface selectedSizeAndColorTypes {
    selectedSize: string | undefined,
    selectedColor: string | undefined
}

export const SelectedSizeAndColor: FC<selectedSizeAndColorTypes> = ({selectedColor, selectedSize}) => {
    return <Stack isInline align={"center"}>
        {selectedColor && <Box
            borderWidth={1}
            borderColor={'blackAlpha.400'}
            w={'12px'}
            h={'12px'}
            borderRadius={'full'}
            bg={`${selectedColor}`}
        />}
        {selectedSize && <Text fontSize={12}> {selectedSize?.toUpperCase()}</Text>}
    </Stack>
}
