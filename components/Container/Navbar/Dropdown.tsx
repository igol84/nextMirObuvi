import MenuItems from "@/components/Container/Navbar/MenuItems";
import {Item} from "@/components/Container/Navbar/items";
type Props = {
  submenus: Item[],
  dropdown: boolean,
  depthLevel: number
}
const Dropdown = ({ submenus, dropdown, depthLevel }: Props) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel}/>
      ))}
    </ul>
  );
};

export default Dropdown;