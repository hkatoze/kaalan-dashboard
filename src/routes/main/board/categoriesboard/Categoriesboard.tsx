import { Outlet } from "react-router-dom";
import "./Categoriesboard.css";
import { CategoriesView } from "./Components/categoriesView/CategoriesView";

export const Categoriesboard = () => {
  return (
    <div className="categoriesboard">
      {location.pathname === "/mainpage/categoriesboard" ? (
        <CategoriesView/>
      ) : (
        <Outlet />
      )}
    </div>
  );
};
