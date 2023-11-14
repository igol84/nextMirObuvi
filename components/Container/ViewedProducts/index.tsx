import React from 'react';
import {Box, Heading, WrapItem} from "@chakra-ui/react";
import {ProductType} from "@/components/Products/types";
import {productCardFactory} from "@/components/Products/ProductCardFactory";
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.scss';
import {Navigation} from 'swiper/modules';

interface Props {
  viewedProducts: ProductType[]
}

const ViewedProducts = ({viewedProducts}: Props) => {
  return (
    <Box>
      <Heading as='h3'>До цього ви дивилися</Heading>
      <Box pt={4}>
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
            1024: {
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
          }}
          spaceBetween={30}
          navigation={true}
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

    </Box>
  );
};

export default ViewedProducts;