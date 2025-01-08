import { NavLogo } from "./ui/NavLogo/NavLogo";
import { NavMenu } from "./ui/NavMenu/NavMenu";
import { Button } from "../Button/Button";
import "./Nav.css";

export function Nav() {
  return (
    <div className={"nav"}>
      <div className="nav-logo-menus-wrap">
        <NavLogo />
        <div className="nav-menus">
          <NavMenu menuName="자유게시판" />
          <NavMenu menuName="중고마켓" />
        </div>
      </div>
      <Button text="로그인" />
    </div>
  );
}
