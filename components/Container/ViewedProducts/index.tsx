import React from 'react';
import {Box, Flex, Heading, IconButton, WrapItem} from "@chakra-ui/react";
import {ProductType} from "@/components/Products/types";
import {productCardFactory} from "@/components/Products/ProductCardFactory";
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.scss';
import {Navigation} from 'swiper/modules';
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {MdArrowBackIosNew, MdArrowForwardIos} from "react-icons/md";

interface Props {
  viewedProducts: ProductType[]
}

const ViewedProducts = ({viewedProducts}: Props) => {
  const d = useDictionaryTranslate("viewedProducts")
  return (
    <Box>
      <Heading as='h3'>{d('beforeThatYouLooked')}</Heading>
      <Flex pt={4} w='100%' alignItems='center' gap={2}>
        <IconButton fontSize={['16', '24', '24', '44']} icon={<MdArrowBackIosNew/>} aria-label='prev'
                    className='review-swiper-button-prev'/>
        <Box width={'94%'}>
        <Swiper
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1224: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
            1500: {
              slidesPerView: 5,
              spaceBetween: 60,
            },
            2500: {
              slidesPerView: 7,
              spaceBetween: 60,
            },
          }}
          spaceBetween={30}
          navigation={{
            nextEl: '.review-swiper-button-next',
            prevEl: '.review-swiper-button-prev',
          }}
          modules={[Navigation]}
          className="viewedProductsSwiper"
        >
          {viewedProducts.map(product => {
            const ProductComponent = productCardFactory(product)
            return (
              <SwiperSlide key={product.id} className="viewedProductsSwiperSlide">
                <WrapItem as='article' key={product.id}>
                  {ProductComponent}
                </WrapItem>
              </SwiperSlide>
            )
          })}
        </Swiper>
        </Box>
        <IconButton fontSize={['16', '24', '24', '44']} icon={<MdArrowForwardIos/>} aria-label='next'
                    className='review-swiper-button-next'/>
      </Flex>

    </Box>
  );
};

export default ViewedProducts;