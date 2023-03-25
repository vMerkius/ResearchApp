import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/" className="link link-main">
          Podsumowanie
        </Link>
        <div className="sites">
          <Link to="/patients" className="link">
            Pacjenci
          </Link>

          <Link to="/projects" className="link">
            Projekty
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
