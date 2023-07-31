import React from 'react';
import {IconButton, Tooltip, VStack} from "@chakra-ui/react";
import {MdDashboard, MdMail, MdSettings} from 'react-icons/md'
import {HiLightBulb, HiBell, HiTag, HiSearch} from 'react-icons/hi'

const Navigation = () => {
  return (
    <VStack p={6} justifyContent='space-between' alignItems='center' w='full'>
      <VStack>
        <Tooltip label='Dashboard' placement='right'>
          <IconButton color={'gray.500'} icon={<MdDashboard/>} aria-label={'Dashboard'}/>
        </Tooltip>
        <Tooltip label='Actions' placement='right'>
          <IconButton color={'gray.500'} icon={<HiLightBulb/>} aria-label={'Actions'}/>
        </Tooltip>
        <Tooltip label='Search' placement='right'>
          <IconButton color={'gray.500'} icon={<HiSearch/>} aria-label={'Search'}/>
        </Tooltip>
        <Tooltip label='Notifications' placement='right'>
          <IconButton color={'gray.500'} icon={<HiBell/>} aria-label={'Notifications'}/>
        </Tooltip>
        <Tooltip label='Tags' placement='right'>
          <IconButton color={'gray.500'} icon={<HiTag/>} aria-label={'Tags'}/>
        </Tooltip>
        <Tooltip label='Messages' placement='right'>
          <IconButton color={'gray.500'} icon={<MdMail/>} aria-label={'Messages'}/>
        </Tooltip>
      </VStack>
      <Tooltip label='Settings' placement='right'>
        <IconButton color={'gray.500'} icon={<MdSettings/>} aria-label={'Settings'}/>
      </Tooltip>
    </VStack>
  );
};

export default Navigation;