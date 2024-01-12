import { FunctionComponent } from "react";
import "./Top.css";
import VideoBlock from "./Components/VideoBlock";
import RightBlock from "./Components/RightBlock";

const Top: FunctionComponent = () => {
  return (
    <div className="topSection flex">
      <VideoBlock />
      <RightBlock />
    </div>
  );
};

export default Top;
