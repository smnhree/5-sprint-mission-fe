import { NavLogo } from "./ui/NavLogo/NavLogo";
import { NavMenu } from "./ui/NavMenu/NavMenu";
import { Button } from "../Button/Button";
import classNames from "classnames";
import { useWindowSize } from "../../hooks/useWindowSize";
import profileIc from "./assets/nav_profile_ic.png";
import "./Nav.css";

export function Nav() {
  const { width } = useWindowSize();

  // todo: 화면 조건 추상화하기
  const navClassName = {
    nav: classNames("nav", {
      tablet: width < 1199 && width >= 744,
      mobile: width < 744,
    }),
    manus: classNames("nav-menus", {
      tablet: width < 1199 && width >= 744,
      mobile: width < 744,
    }),
    loginBtn: classNames("button-wrap", {
      tablet: width < 1199 && width >= 744,
      mobile: width < 744,
    }),
    profileIc: classNames("profile-ic", {
      tablet: width < 1199 && width >= 744,
      mobile: width < 744,
    }),
  };

  return (
    <div className={navClassName.nav}>
      <div className="nav-logo-menus-wrap">
        <NavLogo />
        <div className={navClassName.manus}>
          <NavMenu menuName="자유게시판" />
          <NavMenu menuName="중고마켓" />
        </div>
      </div>
      <div className="nav-right-section">
        <div className={navClassName.loginBtn}>
          <Button text="로그인" />
        </div>
        <a className={navClassName.profileIc}>
          <img src={profileIc} alt="프로필사진" />
        </a>
      </div>
    </div>
  );
}
