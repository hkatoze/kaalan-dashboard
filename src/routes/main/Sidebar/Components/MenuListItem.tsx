import { MouseEventHandler } from "react";
import "./MenuListItem.scss";  // Assurez-vous d'importer votre fichier SCSS
import { Link } from "react-router-dom";

interface MenuListItemProps {
  children: string;
  link: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLLIElement>;
}

const MenuListItem = ({
  children,
  link,
  icon,
  isSelected,
  onClick
}: MenuListItemProps) => {
  return (
    <li className={`listItem ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      <Link to={link} className="menuLink flex">
        {icon}
        <span className="smallText">{children}</span>
      </Link>
    </li>
  );
};

export default MenuListItem;
