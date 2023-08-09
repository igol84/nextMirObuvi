import Dropdown from "@/components/Container/Navbar/Dropdown";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {Item} from "@/components/Container/Navbar/items";

type Props = {
  items: Item
  depthLevel: number
}

const MenuItems = ({items, depthLevel}: Props) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef< HTMLLIElement>(null);
  useEffect(() => {
    const handler = (event: TouchEvent | MouseEvent) => {
      // @ts-ignore
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
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

  return (
    <li className="menu-items" ref={ref} onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave} >
      {items.submenu && items.url ? (
        <>
          <button
            type="button" aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown(prev => !prev)}
          >
            <Link href={items.url}>{items.title}</Link>
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel}/>
        </>
      ) : !items.url && items.submenu ? (
        <>
          <button
            type="button" aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown(prev => !prev)}
          >
            {items.title}{' '}{depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel}/>
        </>
      ): items.url ? (
        <Link href={items.url}>{items.title}</Link>
      ) : ''}
    </li>
  );
};

export default MenuItems;