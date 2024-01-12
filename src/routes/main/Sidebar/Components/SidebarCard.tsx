import { Link } from "react-router-dom";
import "./SidebarCard.css";
import { BsQuestionCircle } from "react-icons/bs";
interface SidebarCardProps {
  link: string;
}
const SidebarCard = ({ link }: SidebarCardProps) => {
  return (
    <div className="sideBarCard">
      <BsQuestionCircle className="icon" />
      <div className="cardContent">``
        <div className="circle1"></div>
        <div className="circle2"></div>
        <h3>Help Center</h3>
        <p>
          Having trouble in Kaalan Admin, please contact us from for more questions.
        </p>
        <Link to={link}>
          <button className="btn">Go to help center</button>
        </Link>
      </div>
    </div>
  );
};

export default SidebarCard;
