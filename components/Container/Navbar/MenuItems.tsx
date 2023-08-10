import Dropdown from "@/components/Container/Navbar/Dropdown";
import {useEffect, useRef, useState} from "react";
import NextLink from "next/link";
import {Item} from "@/components/Container/Navbar/items";
import {Box, Button, Text} from "@chakra-ui/react";

type Props = {
  items: Item
  depthLevel: number
}

const MenuItems = ({items, depthLevel}: Props) => {
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
    dropdown && setDropdown(false);
  };
  return (
    <Box as={'li'} position='relative' className="menu-items" ref={ref} onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave} onClick={closeDropdown}>
      {items.submenu && items.url ? (
        <>
          <Button variant='navButton'
                  aria-haspopup="menu"
                  aria-expanded={dropdown ? "true" : "false"}
                  onClick={() => setDropdown(prev => !prev)}
          >
            <Text as={NextLink} href={items.url}>{items.title}</Text>
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow"/>}
          </Button>
          <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel}/>
        </>
      ) : !items.url && items.submenu ? (
        <>
          <Button variant='navButton' aria-haspopup="menu" textAlign='left'
                  aria-expanded={dropdown ? "true" : "false"}
                  onClick={() => setDropdown(prev => !prev)}
          >
            {items.title}{' '}{depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow"/>}
          </Button>
          <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel}/>
        </>
      ) : items.url ? (
        <Button variant='navButton' as={NextLink} href={items.url}>{items.title}</Button>
      ) : ''}
    </Box>
  );
};

export default MenuItems;