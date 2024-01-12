import { Outlet } from "react-router-dom";
import "./Booksboard.css";
import { Booksview } from "./Components/booksview/Booksview";

export const Booksboard = () => {
  return (
    <div className="booksboard">
      {location.pathname === "/mainpage/booksboard" ? (
        <Booksview/>
      ) : (
        <Outlet />
      )}
    </div>
  );
};
