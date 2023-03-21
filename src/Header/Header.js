import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Podsumowanie</Link>
        </li>
        <li>
          <Link to="/patients">Pacjenci</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
