import {useToastMessages} from "./useToastMessages";

export const useCopy = () => {
    const {SuccessToast, ErrorToast} = useToastMessages()

    return (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                SuccessToast("Copied to clipboard")
            })
            .catch((err) => {
                ErrorToast(err)
            })
    }
}
