import loader from "../../assets/media/loader.png";
import "./index.css";

const LoadingPage = () => {
  return (
    <div className="loader">
      <div className="progress">
        <img className="progress--item" src={loader} alt="Loader" />
        <h1>
          <span className="progress--item__letter">L</span>
          <span className="progress--item__letter">o</span>
          <span className="progress--item__letter">a</span>
          <span className="progress--item__letter">d</span>
          <span className="progress--item__letter">i</span>
          <span className="progress--item__letter">n</span>
          <span className="progress--item__letter">g</span>
          <span className="progress--item__letter">.</span>
          <span className="progress--item__letter">.</span>
          <span className="progress--item__letter">.</span>
        </h1>
        <p>Cette fonctionalité n'est pas encore disponible...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
