import WelcomeVideo from "../assets/videos/welcome.mp4";
import styles from "../styles/Login.module.css";
import logo from "../assets/images/zikplay.png";
import { AUTH_ENDPOINT, CLIENT_ID, scopes, RESPONSE_TYPE } from "../config";

const Login = () => {
  const REDIRECT_URI = (window.location.origin + "/callback/");

  const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes.join(
    "%20"
  )}&show_dialog=true`;

  return (
    <div className={styles.videoContainer}>
      <video loop muted autoPlay className={styles.video}>
        <source src={WelcomeVideo} type="video/mp4" />
      </video>
      <div className={styles.videoOverflow}></div>

      <div className={styles.content}>
        <img src={logo} alt="ZikpPlay Logo" />
        <h1>Sans la Musique</h1>
        <h1>La vie serait une erreur</h1>
        <a href={loginUrl}>
          <button> Se connecter à ZikPlay </button>
        </a>
      </div>
    </div>
  );
};

export default Login;
