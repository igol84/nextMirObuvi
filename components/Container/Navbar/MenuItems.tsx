import Dropdown from "@/components/Container/Navbar/Dropdown";
import {useEffect, useRef, useState} from "react";
import NextLink from "next/link";
import {Item} from "@/components/Container/Navbar/items";
import {Box, Button, Text} from "@chakra-ui/react";

type Props = {
  items: Item
  depthLevel: number
  isMobile?: boolean
  onClose: ()=>void
}

const MenuItems = ({items, depthLevel, isMobile, onClose}: Props) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    const handler = (event: TouchEvent | MouseEvent) => {
      if (dropdown && ref.current && !ref.current.contains(event.target as Node)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);
  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };
  const closeDropdown = () => {
    !isMobile && dropdown && setDropdown(false);
  };
  return (
    <Box as={'li'} position='relative' className="menu-items" ref={ref} onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave} onClick={closeDropdown}>
      {items.submenu && items.url ? (
        <>
          <Button variant='navButton'
                  aria-haspopup="menu" pl={2}
                  aria-expanded={dropdown ? "true" : "false"}
                  onClick={() => setDropdown(prev => !prev)}
          >
            <Text as={NextLink} href={items.url} onClick={onClose}>{items.title}</Text>
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow"/>}
          </Button>
          <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel} isMobile={isMobile} onClose={onClose}/>
        </>
      ) : !items.url && items.submenu ? (
        <>
          <Button variant='navButton' aria-haspopup="menu" textAlign='left'
                  aria-expanded={dropdown ? "true" : "false"}
                  onClick={() => setDropdown(prev => !prev)}
                  pl={isMobile ? 2*(depthLevel+1): 2}
          >
            {items.title}{' '}{!isMobile && depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow"/>}
          </Button>
          <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel} isMobile={isMobile} onClose={onClose}/>
        </>
      ) : items.url ? (
        <Button onClick={onClose} variant='navButton' pl={isMobile && depthLevel>0 ? 2*(depthLevel+1) : 2} as={NextLink} href={items.url}>{items.title}</Button>
      ) : ''}
    </Box>
  );
};

export default MenuItems;