import React, {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';
import {FreeMode, Navigation, Thumbs} from 'swiper/modules';
import {Box, Flex} from "@chakra-ui/react";
import NextImage from "next/image";
import ChakraNextImage from "@/components/base/ChakraNextImage";

type Props = {
  images: string[]
}

export default function Gallery({images}: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Flex gap={2}>
      <Box w='10%'>
        <Swiper
          // @ts-ignore
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="Thumb"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <ChakraNextImage as={NextImage} src={image} alt={'image'} width={0} height={0} sizes="100vw"
                               style={{width: '100%', height: 'auto'}} priority={index===0}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box w='86%'>
        <Swiper
          style={{
            // @ts-ignore
            '--swiper-pagination-color': '#10aec4',
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{swiper: thumbsSwiper}}
          modules={[FreeMode, Navigation, Thumbs]}
          className="Swiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <ChakraNextImage
                as={NextImage} src={image} alt={'image'} width={0} height={0} sizes="100vw"
                style={{width: '100%', height: 'auto'}}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>


    </Flex>
  );
}
