import {FC, useContext} from 'react';
import {
    Text,
    Collapse,
    useDisclosure,
    HStack, Stack, Avatar, Spacer
} from "@chakra-ui/react";
import categories from '../../../json/categories.json'
import {Icon} from "@chakra-ui/icons";
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from "react-icons/all";
import {ICategoryName} from "../../../interfaces/ICategoryName.interface";
import {ICategories} from "../../../interfaces/ICategories.interface";
import {useNavigate, useSearchParams} from "react-router-dom";


const CategoryName: FC<ICategoryName> = ({categoryImage, categoryName, categoryID: CID}) => {


    const navigate = useNavigate()
    const [categoryID, setCategoryID] = useSearchParams()

    return <HStack
        key={CID}
        cursor={'pointer'}
        _hover={{color: 'blue.500'}}
        transition={'.5s'}
        px={2}
        onClick={() => {
            categoryID.set("categoryID", CID)
            navigate(`/store?${categoryID.toString()}`)
        }}>
        <Text>{categoryName}</Text>
        <Spacer/>
        <Avatar size={"xs"} src={categoryImage}/>
    </HStack>
}

export const Categories: FC<ICategories> = ({navigationType, name, icon}) => {

    const {isOpen, onClose, onOpen, onToggle} = useDisclosure()

    return (
        <Stack
            zIndex={1000}
            pos={"relative"}
            onMouseOver={navigationType === 'top' ? onOpen : undefined}
            onMouseLeave={navigationType === 'top' ? onClose : undefined}
        >
            <HStack
                px={1.5}
                mt={2}
                gap={8}
                borderRightWidth={1}
                cursor={"pointer"}
                onClick={onToggle}
            >
                <HStack>
                    <Icon fontSize={20} as={icon}/>
                    <Text fontSize={14}>{name}</Text>
                </HStack>
                {isOpen
                    ? <MdKeyboardArrowDown style={{fontSize: 20}}/>
                    : <MdKeyboardArrowRight style={{fontSize: 20}}/>
                }
            </HStack>
            <Collapse in={isOpen}>
                <Stack
                    w={200}
                    lineHeight={8}
                    pos={navigationType === 'top' ? "absolute" : 'static'}
                    top={navigationType === 'top' ? '95%' : ''}
                    boxShadow={navigationType === 'top' ? "md" : ''}
                    bg={navigationType === 'top' ? "#131928" : ''}
                    pl={navigationType !== 'top' ? 8 : 1}
                >
                    {categories.map(category => {
                        return <CategoryName
                            key={category.categoryID}
                            categoryImage={category.image}
                            categoryName={category.categoryName}
                            categoryID={category.categoryID}
                        />
                    })}
                </Stack>
            </Collapse>
        </Stack>
    );
}
