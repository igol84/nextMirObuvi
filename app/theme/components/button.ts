import {defineStyle, defineStyleConfig} from '@chakra-ui/react'

const colorfulVariant = defineStyle((props) => {
  const {colorScheme: c} = props // add color scheme as a prop
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
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'lowercase',
    borderRadius: 'base', // <-- border radius is same for all variants and sizes
    _dark: {
      textTransform: 'uppercase',
    }
  },
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
      border: 'none',
      color: 'primary.700',
      _hover: {
        bg: 'primary.50',
        color: 'primary.900',
      },
      _dark: {
        color: 'primary.200',
        _hover: {
          bg: 'primary.900',
          color: 'primary.100',
        },

      }
    },
    solid: {
      bg: 'purple.500',
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