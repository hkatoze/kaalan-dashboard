import { QueryClient, QueryClientProvider } from "react-query";
 
import Mainpage from "./routes/main/Mainpage";
import Login from "./routes/login/Login";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";

const userSession = localStorage.getItem("user") || "disconnected";
const App = () => {
 
  const client = new QueryClient();
  const location = useLocation();

  return (
    <QueryClientProvider client={client}>
      <div className="app">
        {userSession==="connected" && location.pathname==="/"? <Mainpage/>: (userSession !="connected" && location.pathname ==="/"?<Login/>:<Outlet/>)}
      </div>
    </QueryClientProvider>
  );
};

export default App;
