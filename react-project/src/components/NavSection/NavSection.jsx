import { useScreenType } from "../../hooks/useScreenType";
import { PrimaryButton } from "../../components/button/PrimaryButton/PrimaryButton";
import largeLogo from "../../assets/imgs/logos/logo.png";
import smallLogo from "../../assets/imgs/logos/logo2.png";
import userProfileIc from "../../assets/icons/basic_user_profile.png";
import "./NavSection.css";

export function NavSection() {
  const screenType = useScreenType(); // todo: 이대로 할지, prop으로 받을지
  const logoSrc = screenType === "mobile" ? smallLogo : largeLogo;
  return (
    <div className={`nav ${screenType}`}>
      <div className={`left-wrap ${screenType}`}>
        <a className={`logo ${screenType}`}>
          <img src={logoSrc} alt="판다마켓" />
        </a>
        {/* // todo: menu -> components로 분리 고민 */}
        <div className={`menus ${screenType}`}>
          <a className="menu">자유게시판</a>
          <a className="menu">중고마켓</a>
        </div>
      </div>
      {/* // todo: 버튼, 프로팔사진 true/false로 안보이게 처리하기 */}
      <div className={`right-wrap ${screenType}`}>
        <div className={`button-wrap ${screenType}`}>
          <PrimaryButton text="로그인" />
        </div>
        <a className={`user-profile-ic ${screenType}`}>
          <img src={userProfileIc} alt="Profile Icon" />
        </a>
      </div>
    </div>
  );
}
