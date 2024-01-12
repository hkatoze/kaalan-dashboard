import "./VideoBlock.css";
import VIDEO from "../../../../../../../../../assets/video.mp4";
import { Link } from "react-router-dom";
const VideoBlock = () => {
  return (
    <div className="videoBlock flex">
      <h1>Explorez l'univers infini de la littérature avec Kaalan.</h1>
      <p>
        Tous les livres du moment, à portée de main.<br/>Plongez dans la
        lecture numérique sans limites.
      </p>
      <div className="buttons flex">
        <Link to="/mainpage/booksboard/addbook">
          <button className="btn">Ajouter un livre</button>
        </Link>

        <Link to="/mainpage/dashboard/alertsHistory" className="flex link">
          <button className="btn transparent">Statistiques</button>
        </Link>
      </div>
      <div className="videoDiv">
        <video src={VIDEO} autoPlay loop muted></video>
      </div>
    </div>
  );
};

export default VideoBlock;
