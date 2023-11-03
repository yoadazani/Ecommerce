import React, {FC} from 'react';
import {
    Box, Button,
    Container, Divider,
    Grid, GridItem,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputRightElement, List, ListItem,
    Stack, Text, useMediaQuery
} from "@chakra-ui/react";
import {AiFillLinkedin, AiFillTwitterCircle, BsFacebook, FaInstagramSquare, FiSend} from 'react-icons/all';
import {Link} from "react-router-dom";

const NewsletterSection = () => {

    const [isLargerThen678px] = useMediaQuery('(min-width: 678px)')

    return <Container maxW={"container.lg"} py={8}>
        <Stack isInline={isLargerThen678px} justifyContent={"space-evenly"}>
            <HStack minW={'40%'}>
                <FiSend color={'beige'} fontSize={28}/>
                <Heading as={"span"} color={'beige'} fontSize={20}>
                    Sign Up For Newsletter
                </Heading>
            </HStack>
            <InputGroup maxW={'full'} overflow={"hidden"} color={"black"}>
                <Input
                    type='text'
                    variant={'solid'}
                    px={2}
                    placeholder={'Exemple@gmail.com'}
                />
                <InputRightElement
                    w={100}
                    bg={"beige"}
                    cursor={"pointer"}
                    rounded={'0 8px 8px 0'}
                >
                    <Button variant={"unstyled"}>Subscribe</Button>
                </InputRightElement>
            </InputGroup>
        </Stack>
    </Container>
}

export const Footer: FC = () => {
    return <Box bg={"#131928"} h={"full"} py={5} color={"whitesmoke"}>
        <NewsletterSection/>

        <Divider borderColor={'#585c65'}/>
        <Container maxW={"container.lg"} pb={8}>
            <Grid templateColumns={'repeat(5, 1fr)'} gap={5} >
                <GridItem colSpan={{base: 5, sm: 2}}>
                    <Heading py={5} color={'beige'} fontSize={20}>Contact us</Heading>
                    <address style={{lineHeight: '30px'}}>
                        Email: <a href="mailto:yoad208@gmail.com">yoad208@gmail.com</a> <br/>
                        <Text> Address: Hitchadshut 6, Harish</Text>
                        <Text>Country: Israel</Text><br/>
                        Phone: <a href="tel:+972-549108919">+972-549108919</a>
                    </address>
                    <HStack pt={4} spacing={6}>
                        <BsFacebook fontSize={24}/>
                        <AiFillTwitterCircle fontSize={24}/>
                        <AiFillLinkedin fontSize={24}/>
                        <FaInstagramSquare fontSize={24}/>
                    </HStack>
                </GridItem>
                <GridItem colSpan={{base: 5, sm: 1}}>
                    <Heading py={5} color={'beige'} fontSize={20}>Information</Heading>
                    <List lineHeight={8} fontSize={14}>
                        <ListItem>
                            <Link to={'/'}>
                                Privacy policy
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to={'/'}>
                                Refund policy
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to={'/'}>
                                Shipping policy
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to={'/'}>
                                Terms Of Service
                            </Link>
                        </ListItem>
                    </List>
                </GridItem>
                <GridItem colSpan={{base: 5, sm: 1}}>
                    <Heading py={5} color={'beige'} fontSize={20}>Account</Heading>
                    <List lineHeight={8} fontSize={14}>
                        <ListItem>
                            <Link to={'/'}>
                                Profile
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to={'/'}>
                                About Us
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to={'/'}>
                                Feq
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to={'/'}>
                                Contact
                            </Link>
                        </ListItem>
                    </List>
                </GridItem>
                <GridItem colSpan={{base: 5, sm: 1}}>
                    <Heading py={5} color={'beige'} fontSize={20}>Quick links</Heading>
                    <List lineHeight={8} fontSize={14}>
                        <ListItem>
                            <Link to={'/'}>
                                Man
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to={'/'}>
                                Woman
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to={'/'}>
                                Kids
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to={'/'}>
                                Baby`s
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to={'/'}>
                                Large sizes
                            </Link>
                        </ListItem>
                    </List>
                </GridItem>
            </Grid>
        </Container>

        <Divider borderColor={'#585c65'}/>
        <Text textAlign={"center"} pt={2} fontSize={'xs'}>@2023, DevCorner Powered by YoadAzani.</Text>
    </Box>
}