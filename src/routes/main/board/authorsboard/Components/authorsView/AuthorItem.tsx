import { Link } from "react-router-dom";
import "./AuthorItem.css";
interface AuthorItemProps {
  cover: string;
  title: string;
  link: string;
}
export const AuthorItem = ({ title, cover, link }: AuthorItemProps) => {
  return (
    <Link to={link} className="authorItem">
      <div >
        <div className="imageBox">
          <img src={cover} alt="" />
        </div>
        <h3 className="title">{title}</h3>
      </div>
    </Link>
  );
};
