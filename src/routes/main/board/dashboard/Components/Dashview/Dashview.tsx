import { useQuery } from "react-query";
import Header from "../../../../../../Components/Header";
import Top from "./Components/Top/Top";

import "./Dashview.css";
import axios from "axios";
import { endpoint, headers } from "../../../../../../constants";
 
const userId = localStorage.getItem("userId") || "";
export const Dashview = () => {
  const fetchEmployeeById = () => {
    return axios.get(`${endpoint}/api/users/${userId}`, { headers: headers });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["employee-infos"],
    queryFn: fetchEmployeeById,
  });

  return (
    <div className="dashview">
      <Header
        title="Bienvenu sur Kaalan ADMIN"
        subtitle={`Salut ${
          !isLoading && data?.data.data.lastname
        } , ravi de te revoir!`}
      />
      <Top />
      <div className="body"></div>
    </div>
  );
};
