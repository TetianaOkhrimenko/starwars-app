import { NavLink } from "react-router-dom";
import "./Header.css";
import Logo from "../Logo/Logo";

export default function Header() {
  return (
    <header className="Header">
      <Logo />
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to="/people"
          >
            People
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to="/planets"
          >
            Planets
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to="/starships"
          >
            Starships
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
