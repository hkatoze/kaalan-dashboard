import { Link } from "react-router-dom";
import "./BookItem.css";
interface BookItemProps {
  cover: string;
  title: string;
  subtitle?: string;
  link: string;
}
export const BookItem = ({ title, subtitle, cover, link }: BookItemProps) => {
  return (
    <Link to={link} className="bookItem">
      <div >
        <div className="imageBox">
          <img src={cover} alt="" />
        </div>
        <h3 className="title" style={!subtitle ? {fontSize:"13px"}:{fontSize:""}}>{title}</h3>
        <h3 className="subtitle">{subtitle}</h3>
      </div>
    </Link>
  );
};
