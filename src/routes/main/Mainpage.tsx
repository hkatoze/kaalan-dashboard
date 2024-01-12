import { Outlet, useLocation } from "react-router-dom";

import Board from "./board/Board";
import Sidebar from "./Sidebar/Sidebar";
import { Dashboard } from "./board/dashboard/Dashboard";
 

const Mainpage = () => {
  const location = useLocation();
  return (
    <>
      <Sidebar />
      <Board>
        {location.pathname === "/" || location.pathname === "/mainpage" ? (
          <Dashboard />
        ) : (
          <Outlet />
        )}
      </Board>
    </>
  );
};

export default Mainpage;
