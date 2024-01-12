// DropdownMenu.tsx

import { useState, FC, ReactNode } from "react";

interface DropdownMenuProps {
  trigger: ReactNode;  
  children: ReactNode;  
}

const DropdownMenu: FC<DropdownMenuProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <div onClick={toggleDropdown} className="dropdown-trigger">
        {trigger}
      </div>
      {isOpen && <div className="dropdown-content">{children}</div>}
    </div>
  );
};

export default DropdownMenu;
