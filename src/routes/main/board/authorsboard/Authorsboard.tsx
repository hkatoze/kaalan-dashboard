import { Outlet } from "react-router-dom";
import "./Authorsboard.css";
import { Authorsview } from "./Components/authorsView/AuthorsView";
 
export const Authorsboard = () => {
  return (
    <div className="authorsboard">
      {location.pathname === "/mainpage/authorsboard" ? (
        <Authorsview />
      ) : (
        <Outlet />
      )}
    </div>
  );
};
