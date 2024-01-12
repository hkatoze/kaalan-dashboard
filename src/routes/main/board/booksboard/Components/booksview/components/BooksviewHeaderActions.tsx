import { Link } from "react-router-dom";
import Button from "../../../../../../../Components/Button";
 
import "./BooksviewHeaderActions.css";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

export const BooksviewHeaderActions = () => {
  return (
    <div className="actions">
      <div className="iconBox">
        <HiAdjustmentsHorizontal size="30" />
      </div>
      <Link to="/mainpage/booksboard/addbook">
        <Button type="button">Ajouter un livre</Button>
      </Link>
    </div>
  );
};
