'use client'
import React, {useContext} from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon
} from "@chakra-ui/react";
import {z} from 'zod'
import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

const schema = z.object({
  firstName: z.string().trim()
    .min(2, 'First name must be at least 2 characters')
    .max(16, {message: 'First name contain at most 16 characters'}),
  lastName: z.string().trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(16, {message: 'Last name contain at most 16 characters'}),
  phone: z.string().trim().length(9, 'Phone number must be 9 characters length'),
  email: z.string().trim().email().or(z.literal('')),
  delivery: z.string().trim()
})


type Schema = z.infer<typeof schema>

const OrderForm = () => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("orderForm")
  const defaultValues: Schema = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    delivery: ''
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<Schema>({
    defaultValues,
    resolver: zodResolver(schema)
  })
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    console.log(data)
    await new Promise(release => setTimeout(release, 1000))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading as='h2' sx={{pb: 6}}>{d('clientData')}</Heading>
      <FormControl isInvalid={!!errors.firstName} sx={{pb: 4}} isRequired>
        <FormLabel>{d('firstName')}</FormLabel>
        <Input {...register('firstName')} type='text' placeholder={d('firstName')} width='auto'/>
        {errors.firstName &&
          <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>
        }
      </FormControl>
      <FormControl isInvalid={!!errors.lastName} sx={{pb: 4}} isRequired>
        <FormLabel>{d('secondName')}</FormLabel>
        <Input {...register('lastName')} type='text' placeholder={d('secondName')} width='auto'/>
        {errors.lastName &&
          (
            <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>
          )}
      </FormControl>
      <FormControl isInvalid={!!errors.phone} sx={{pb: 4}} isRequired>
        <FormLabel>{d('phoneNumber')}</FormLabel>
        <InputGroup>
          <InputLeftAddon children='+380'/>
          <Input {...register('phone')} type='number' placeholder={d('phoneNumber')} width='auto'/>
        </InputGroup>
        {errors.phone &&
          (
            <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
          )}
      </FormControl>
      <FormControl isInvalid={!!errors.email} sx={{pb: 4}}>
        <FormLabel>Email</FormLabel>
        <Input {...register('email')} placeholder='Email' width='auto'/>
        {errors.email &&
          (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
      </FormControl>
      <Heading as='h2' sx={{pb: 6}}>{d('delivery')}</Heading>
      <FormControl isInvalid={!!errors.delivery} sx={{pb: 4}} isRequired>
        <FormLabel>{d('city')}</FormLabel>
        <Input {...register('delivery')} placeholder={d('city')} width='auto'/>
        {errors.delivery
          ? <FormErrorMessage>{errors.delivery.message}</FormErrorMessage>
          : <FormHelperText>{d('cityInfo')}</FormHelperText>
        }
      </FormControl>
      <Button variant='solid' mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        {d('submit')}
      </Button>
    </form>
  );
};

export default OrderForm;