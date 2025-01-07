import logo from "../../assets/nav_logo.png";
import "./NavLogo.css";

export function NavLogo() {
  return (
    <a className="nav-logo">
      <img src={logo} alt="판다마켓" />
    </a>
  );
}
