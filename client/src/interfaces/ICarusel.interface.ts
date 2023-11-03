export interface ICarousel {
    arr: {
        id: string,
        image: string
    }[],
    elementsPerView?: number,
    autoSlide?: boolean,
    autoSlideInterval?: number
}