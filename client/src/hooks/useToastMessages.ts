import {useToast} from "@chakra-ui/react";

export const useToastMessages = () => {
    const toast = useToast()

    const ErrorToast = (message : string) => {
        return toast({
            title: 'Error.',
            description: message,
            status: 'error',
            duration: 3000,
            position: 'top-left',
            isClosable: true,
        })
    }

    const SuccessToast = (message : string) => {
        return toast({
            title: 'Success.',
            description: message,
            status: 'success',
            duration: 3000,
            position: 'top-left',
            isClosable: true,
        })
    }

    return {
        ErrorToast,
        SuccessToast
    }
}
