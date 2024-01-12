import { FunctionComponent, useState } from "react";
import "./Sidebar.css";
import { IoMdSpeedometer } from "react-icons/io";
import { ImBooks } from "react-icons/im";
import { PiStudent } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbCategoryFilled } from "react-icons/tb";
import MenuListTemplate from "./Components/MenuListTemplate";
import MenuListItem from "./Components/MenuListItem";
import SidebarCard from "./Components/SidebarCard";
import Logo from "./Components/Logo";

const Sidebar: FunctionComponent = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(1);
  return (
    <div className="sideBar grid">
      <Logo />
      <MenuListTemplate headding="QUICK MENU">
        <MenuListItem
          icon={<IoMdSpeedometer className="icon" />}
          link="/mainpage/dashboard/dashview"
          isSelected={selectedMenuItem === 1}
          onClick={() => setSelectedMenuItem(1)}
        >
          Dash board
        </MenuListItem>

        <MenuListItem
          icon={<ImBooks className="icon" />}
          link="/mainpage/booksboard/booksview"
          isSelected={selectedMenuItem === 2}
          onClick={() => setSelectedMenuItem(2)}
        >
          Livres
        </MenuListItem>
        <MenuListItem
          icon={<PiStudent className="icon" />}
          link="/mainpage/authorsboard/authorsview"
          isSelected={selectedMenuItem === 3}
          onClick={() => setSelectedMenuItem(3)}
        >
          Auteurs
        </MenuListItem>
        <MenuListItem
          icon={<TbCategoryFilled className="icon" />}
          link="/mainpage/categoriesboard/categoriesview"
          isSelected={selectedMenuItem === 4}
          onClick={() => setSelectedMenuItem(4)}
        >
          Categories
        </MenuListItem>
        <MenuListItem
          icon={<FaUsers className="icon" />}
          link="/mainpage/usersboard"
          isSelected={selectedMenuItem === 5}
          onClick={() => setSelectedMenuItem(5)}
        >
          Utilisateurs
        </MenuListItem>
      </MenuListTemplate>
      <MenuListTemplate headding="SETTINGS">
        <MenuListItem
          icon={<CgProfile className="icon" />}
          link="/mainpage/profilboard"
          isSelected={selectedMenuItem === 6}
          onClick={() => setSelectedMenuItem(6)}
        >
          Profil
        </MenuListItem>
        <MenuListItem
          icon={null}
          link="#"
          isSelected={selectedMenuItem === 7}
          onClick={() => setSelectedMenuItem(7)}
        >
          {" "}
        </MenuListItem>
      </MenuListTemplate>
      <SidebarCard link="/mainpage/helpboard" />
    </div>
  );
};

export default Sidebar;
