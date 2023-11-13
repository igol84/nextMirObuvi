import React, {useState} from 'react';
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {Badge, Box, Select} from "@chakra-ui/react";
import {getColorScheme} from "./functions";
import {allStatus, OrderStatusType} from "./types";
import {serverActionChangeOrderStatus} from "@/components/base/Status/actions";

interface Props {
  orderId: string
  status: OrderStatusType
}


const Status = ({orderId, status}: Props) => {
  const d = useDictionaryTranslate("status")
  const colorScheme = getColorScheme(status)
  const [isDisabled, setIsDisabled] = useState(true)
  const allStatusTranslated = new Map<OrderStatusType, string>()
  for (const status of allStatus) {
    allStatusTranslated.set(status, d(status))
  }
  const onClick = () => {
    setIsDisabled(false)
  }
  const onBlur = () => {
    setIsDisabled(true)
  }

  const handlerChangeStatus = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsDisabled(true)
    const selectedStatus = event.target.value as OrderStatusType
    await serverActionChangeOrderStatus(orderId, selectedStatus)
  }

  return (
    <Box onClick={onClick}>
      {isDisabled
        ? (
          <Badge colorScheme={colorScheme} variant='solid'>
            {d(status)}
          </Badge>
        ) : (
          <Select onBlur={onBlur} defaultValue={status} autoFocus={true} size='xs' onChange={handlerChangeStatus}>
            {allStatus.map(item => (
              <option key={item} value={item}>{allStatusTranslated.get(item)}</option>
            ))}
          </Select>
        )
      }
    </Box>
  );
};

export default Status;