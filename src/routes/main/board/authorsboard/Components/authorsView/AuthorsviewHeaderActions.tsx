import { Link } from "react-router-dom";
 
 
import "./AuthorsviewHeaderActions.css";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import Button from "../../../../../../Components/Button";

export const AuthorsviewHeaderActions = () => {
  return (
    <div className="actions">
      <div className="iconBox">
        <HiAdjustmentsHorizontal size="30" />
      </div>
      <Link to="/mainpage/authorsboard/addauthor">
        <Button type="button">Ajouter un auteur</Button>
      </Link>
    </div>
  );
};
