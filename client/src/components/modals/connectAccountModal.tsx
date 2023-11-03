import {FC} from "react";
import {Text} from '@chakra-ui/react'
import {useNavigate} from "react-router-dom";

type Props = {
    btnText: string
}
export const ConnectAccountModal: FC<Props> = ({btnText}) => {

    const navigate = useNavigate()

    return <>
        <Text cursor='pointer' width={'100%'} onClick={() => {
            navigate('/auth/register')
        }} children={btnText}/>
    </>
}
