import { useRouteError } from "react-router-dom";
import "./Errorpage.css";
interface RouteError {
  statusText?: string;
  message?: string;
}
const Errorpage = () => {
  const error: RouteError = useRouteError() as RouteError;
  return (
    <div className="errorPage">
      <h2>Oops</h2>
      <p>Sorry, an unexpected error has occurred.</p>{" "}
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default Errorpage;
