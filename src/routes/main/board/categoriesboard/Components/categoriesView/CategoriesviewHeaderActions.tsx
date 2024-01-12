import { Link } from "react-router-dom";
 
 
import "./CategoriesviewHeaderActions.css";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import Button from "../../../../../../Components/Button";

export const CategoriesviewHeaderActions = () => {
  return (
    <div className="actions">
      <div className="iconBox">
        <HiAdjustmentsHorizontal size="30" />
      </div>
      <Link to="/mainpage/categoriesboard/addcategory">
        <Button type="button">Ajouter une catégorie</Button>
      </Link>
    </div>
  );
};
