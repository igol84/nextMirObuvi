import React, {useState} from 'react';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';

import './styles.scss';

// import required modules
import {FreeMode, Navigation, Thumbs} from 'swiper/modules';
import {Box, Flex} from "@chakra-ui/react";

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
              <img src={image} alt={'image'}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box w='85%'>
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
              <img src={image} alt={'image'}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>


    </Flex>
  );
}
