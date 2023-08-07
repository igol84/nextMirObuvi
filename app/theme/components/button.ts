import {defineStyle, defineStyleConfig} from '@chakra-ui/react'
const colorfulVariant = defineStyle((props) => {
  const { colorScheme: c } = props // add color scheme as a prop
  return {
    _light: {
      bg: `${c}.200`,
      color: `${c}.800`,
    },
    _dark: {
      bg: `${c}.700`,
      color: `${c}.200`,
    },
  }
})
const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: ({ colorMode }) =>({
    fontWeight: 'bold',
    textTransform: colorMode === "dark" ? 'uppercase' : 'lowercase',
    borderRadius: 'base', // <-- border radius is same for all variants and sizes
  }),
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'purple.500',
      color: 'purple.500',
    },
    solid: {
      bg: 'purple.500',
      color: 'white',
    },
    my: {
      bg: 'red.500',
      color: 'white',
    },
    colorful: colorfulVariant,
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline',
  }
})

export default Button