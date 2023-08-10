import MenuItems from "@/components/Container/Navbar/MenuItems";
import {Item} from "@/components/Container/Navbar/items";
import {Box} from "@chakra-ui/react";

type Props = {
  submenus: Item[],
  dropdown: boolean,
  depthLevel: number
}
const Dropdown = ({ submenus, dropdown, depthLevel }: Props) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  return (
    <Box as={'ul'} bg={'bodyColor'} boxShadow='base' _dark={{bg:'bodyColor', boxShadow: 'dark-lg'}} className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel}/>
      ))}
    </Box>
  );
};

export default Dropdown;