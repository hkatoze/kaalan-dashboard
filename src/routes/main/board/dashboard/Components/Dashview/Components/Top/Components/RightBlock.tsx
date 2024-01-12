import IMG2 from "../../../../../../../../../assets/illustration.png";
import { BsArrowRightShort } from "react-icons/bs";

import "./RightBlock.css";
 
import { Link } from "react-router-dom";
import SidebarCard from "../../../../../../../Sidebar/Components/SidebarCard";

const RightBlock = () => {
  return (
    <div className="rightBlock flex">
      <div className="main flex">
        <div className="textDiv">
          <h1>Nos Statistiques</h1>
          <div className="flex">
            <span>
              Aujourd'hui <br /> <small>0 visites</small>
            </span>
            <span>
              Ce mois <br /> <small>0 visites</small>
            </span>
          </div>
          <Link to="/mainpage/dashboard/alertsHistory" className="flex link">
            <span >
              Explorer les stats
              <BsArrowRightShort className="icon" />
            </span>
          </Link>
        </div>
        <div className="imgDiv">
          <img src={IMG2} alt="Image name" />
        </div>
      </div>
      <SidebarCard link="/mainpage/helpboard" />
    </div>
  );
};

export default RightBlock;
