import React from 'react';
import {IconButton} from "@chakra-ui/react";

interface Props {
  icon: React.ReactElement
  onClick: () => void
  hidden: boolean
}

const FavoriteIcon = ({icon, onClick, hidden}: Props) => {
  return (
    <IconButton
      sx={{transitionDuration: '0.2s', transitionTimingFunction: "ease-in-out"}}
      icon={icon} position='absolute' right={3} top={4} color='secondary' onClick={onClick} size='sm'
      _hover={{
        transform: 'scale(1.5)',
        transitionDuration: '0.2s',
        transitionTimingFunction: "ease-in-out"
      }}
      variant='link' aria-label={'Favorite Icon'} hidden={hidden}
    />
  );
};

export default FavoriteIcon;