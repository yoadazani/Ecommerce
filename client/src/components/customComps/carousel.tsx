import React, {FC} from 'react';
import {AspectRatio, Box, Image} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper";
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from 'react-icons/all'
import {ICarousel} from "../../interfaces/ICarusel.interface";

import 'swiper/css';
import 'swiper/css/effect-fade';

export const Carousel: FC<ICarousel> = (
    {
        arr,
        elementsPerView = 1,
        autoSlide = false,
        autoSlideInterval = 2500
    }) => {

    return <Box pos={"relative"} py={2} px={1} zIndex={0}>
        <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={25}
            slidesPerView={elementsPerView}
            navigation={{
                nextEl: ".button-next",
                prevEl: ".button-prev"
            }}
            autoplay={{
                delay: autoSlideInterval,
                disableOnInteraction: false,
            }}
            loop={!!autoSlide}
            scrollbar={{draggable: true}}
            grabCursor={true}
        >
            {arr.map(element => (
                <SwiperSlide key={element.id}>
                    <AspectRatio ratio={{base: 21 / 9, md: 21 / 7}} mx={"auto"}>
                        <Image loading={'lazy'} zIndex={0} src={element.image}/>
                    </AspectRatio>
                </SwiperSlide>
            ))}
            <Icon
                className={'button-prev'}
                pos={"absolute"}
                left={{base: '3%', md: '2%'}}
                top={'45%'}
                fontSize={{base: 18, md: 32}}
                zIndex={1}
                cursor={'pointer'}
                rounded={"full"}
                bg={"whiteAlpha.600"}
                as={MdOutlineKeyboardArrowLeft}
            />
            <Icon
                className={'button-next'}
                pos={"absolute"}
                right={{base: '3%', md: '2%'}}
                top={'45%'}
                fontSize={{base: 18, md: 32}}
                zIndex={1}
                cursor={'pointer'}
                rounded={"full"}
                bg={"whiteAlpha.600"}
                as={MdOutlineKeyboardArrowRight}
            />
        </Swiper>
    </Box>
}
