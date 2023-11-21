import React from 'react';
import {Box, IconButton} from "@chakra-ui/react";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {productCardFactory} from "@/components/Products/ProductCardFactory";
import {ProductType} from "@/components/Products/types";
import {useStore} from "@/lib/store";
import {serverActionPushProductLike, serverActionPutProductLike} from "@/components/Products/actions";


interface Props {
  product: ProductType
}

const Product = ({product}: Props) => {
  const ProductComponent = productCardFactory(product)
  const [user, pushFavoriteProduct, putFavoriteProduct] = useStore(
    state => [state.user, state.pushFavoriteProduct, state.putFavoriteProduct]
  )
  const isAuth = !!user
  const isFavorite = user ? user.favoriteProducts.has(product.url) : false
  const icon = isFavorite ? <FaHeart/> : <FaRegHeart/>

  const onClickNotAuthorizedUser = () => undefined
  const onClickOnFavorite = async (userId: string, productUrl: string) => {
    putFavoriteProduct(productUrl)
    await serverActionPutProductLike(userId, productUrl)
  }
  const onClickOnNotFavorite = async (userId: string, productUrl: string) => {
    pushFavoriteProduct(productUrl)
    await serverActionPushProductLike(userId, productUrl)
  }
  const onClick = !isAuth
    ? onClickNotAuthorizedUser
    : isFavorite
      ? () => onClickOnFavorite(user.id, product.url)
      : () => onClickOnNotFavorite(user.id, product.url)
  return (
    <Box position='relative'>
      <IconButton icon={icon} position='absolute' right={3} top={3} color='secondary' onClick={onClick}
                  size='sm' variant='link' aria-label={''}/>
      {ProductComponent}
    </Box>
  )
}

export default Product