import {sizeStyles} from "@/app/theme/foundations/layers/sizeStyles";
import {orderListStyles} from "@/app/theme/foundations/layers/orderListStyles";

const layerStyles = {
  base: {
    bg: 'gray.50',
    border: '2px solid',
    borderColor: 'gray.500',
  },
  selected: {
    bg: 'teal.500',
    color: 'teal.700',
    borderColor: 'orange.500',
  },
  ...sizeStyles,
  ...orderListStyles
}

export default layerStyles