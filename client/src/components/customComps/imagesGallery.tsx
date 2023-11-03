import {HStack, Image, Stack} from "@chakra-ui/react";
import {insertAtIndex} from "../../utilities/insertAtIndex";
import {FC, useState} from "react";

export const ImagesGallery: FC<{images: string[] }> = ({images}) => {

    const [gallery, setGallery] = useState(images)
    const [imageSrc, setImageSrc] = useState(gallery[0])

    const replaceImageSrc = (image: string) => {
        setImageSrc(image)
    }

    return <Stack>
        <Image w={"full"} h={450} maxW={'100%'} objectFit={'cover'} src={imageSrc} alt="image"/>
        <HStack>
            {gallery.map((image, i) => {
                return <Image
                    key={i}
                    maxW={55}
                    objectFit={'cover'}
                    src={insertAtIndex(image, '_thumbnail_220x293_thumbnail_80x', image.length - 5)}
                    alt={'product image'}
                    onClick={() => replaceImageSrc(image)}
                />
            })}
        </HStack>
    </Stack>
}
