import { Outlet } from "react-router-dom";
import "./Dashboard.css";
import { Dashview } from "./Components/Dashview/Dashview";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      {location.pathname === "/mainpage/dashboard" ||
      location.pathname === "/" ? (
        <Dashview />
      ) : (
        <Outlet />
      )}
    </div>
  );
};
