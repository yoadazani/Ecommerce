import React, {FC} from "react";
import {IAccordion} from "../../interfaces/IAccordion.interface";
import {Accordion, AccordionButton, AccordionItem, Text} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/all";


export const AccordionStyle: FC<IAccordion> = (
    {
        children,
        isOpen,
        accordionName
    }) => {
    return <Accordion
        defaultIndex={isOpen ? [0] : []}
        allowToggle
    >
        <AccordionItem border={'none'}>
            {({isExpanded}) => (
                <>
                    <AccordionButton
                        gap={2}
                        _hover={{bg: 'none'}}
                        fontStyle={'oblique'}
                        fontSize={"sm"}
                        fontWeight={"bold"}
                    >
                        <Text as={"span"}>
                            {accordionName}
                        </Text>
                        {isExpanded
                            ? <Icon as={AiOutlinePlus}/>
                            : <Icon as={AiOutlineMinus}/>
                        }
                    </AccordionButton>
                    {children}
                </>
            )}
        </AccordionItem>
    </Accordion>
}
