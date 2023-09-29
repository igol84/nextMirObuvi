'use client'
import React, {useState, useTransition} from 'react';
import {Alert, AlertIcon, Box, Button, ScaleFade, Stack} from "@chakra-ui/react";
import {MdShoppingCart} from 'react-icons/md'
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {incrementProductQuantity} from "@/components/product/action";


interface Props {
  productId: string
  size?: number | null
}

const AddToCartButton = ({productId, size}: Props) => {
  const d = useDictionaryTranslate("product")
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const isDisabled = !(size === undefined || size)
  const onClick = () => {
    setSuccess(false);
    startTransition(async () => {
      await incrementProductQuantity(productId, size ? size : null)
      setSuccess(true);
    });
  };
  return (
    <>
      <Button isLoading={isPending} onClick={onClick} leftIcon={<MdShoppingCart/>}
              variant='solid' isDisabled={isDisabled}>
        {d('buy')}
      </Button>

      {!isPending && success && (
        <Stack spacing={3} pt={2}>
          <Alert status='success'>
            <AlertIcon/>
            Added on Cart
          </Alert>
        </Stack>
      )}
      <ScaleFade initialScale={0.9} in={!isPending && success}>
        <Box
          p='40px'
          color='white'
          mt='4'
          bg='teal.500'
          rounded='md'
          shadow='md'
        >
          Added on Cart
        </Box>
      </ScaleFade>

    </>
  );
};

export default AddToCartButton;