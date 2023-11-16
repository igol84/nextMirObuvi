import React, {useState} from 'react';
import {Flex, Text, Tooltip} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {serverActionPushProductLike, serverActionPutProductLike} from "@/components/product/actions";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

interface Props {
  userId: string | undefined
  productUrl: string
  isFavorite: boolean
}


const Like = ({userId, productUrl, isFavorite}: Props) => {
  const d = useDictionaryTranslate("favorite")
  const [isFavoriteUI, setIsFavoriteUI] = useState(isFavorite)
  const isAuth = !!userId
  const label = isAuth ? '' : d('loginIn')

  const color = isFavoriteUI ? 'secondary' : 'primary'
  const onLikeClick = !isAuth
    ? () => undefined
    : isFavoriteUI
      ? async () => {
        setIsFavoriteUI(false)
        const result = await serverActionPutProductLike(userId, productUrl)
        if (!result)
          setIsFavoriteUI(true)
      } : async () => {
        setIsFavoriteUI(true)
        const result = await serverActionPushProductLike(userId, productUrl)
        if (!result)
          setIsFavoriteUI(false)
      }
  return (
    <Tooltip hasArrow label={label}>
      <Flex gap={4} alignItems='center' color={color} _hover={{cursor: 'pointer', color: 'secondary'}}
            onClick={onLikeClick}>
        <Icon as={isFavoriteUI ? FaHeart : FaRegHeart} boxSize={16}/>
        <Text>{isFavoriteUI ? d('inFan') : d('fan')}</Text>
      </Flex>
    </Tooltip>
  );
};

export default Like;