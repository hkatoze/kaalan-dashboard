import LOGO from "../../../../assets/logo.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logoDiv flex">
      <img src={LOGO} alt="Image name" />
      <h2>Kaalan</h2>
    </div>
  );
};

export default Logo;
