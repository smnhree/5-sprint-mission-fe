import { Link, NavLink } from "react-router-dom";
import icLogo from "../assets/logo/ic_panda.png";
import nameLogo from "../assets/logo/name_panda.png";
import Button from "../common/Button.jsx";

function Header({ isMenuVisible }) {
  const menus = [
    {
      title: "자유게시판",
      path: "/board",
    },
    {
      title: "중고마켓",
      path: "/items",
    },
  ];

  const style = {
    header: {
      padding: isMenuVisible ? "px-[200px]" : "px-[400px]",
    },
    button: {
      width: isMenuVisible ? "w-[88px]" : "w-[128px]",
      height: isMenuVisible ? "h-[42px]" : "h-[48px]",
    },
  };

  function getLinkStyle({ isActive }) {
    return {
      color: isActive ? "#3692FF" : undefined,
    };
  }

  return (
    <header
      className={`flex w-full h-[70px] ${style.header.padding} border-b-[1px] border-[#DFDFDF]`}
    >
      <div className="flex w-full justify-between items-center sticky">
        <section className="flex items-center gap-[24px]">
          <Link to="/">
            <figure className="flex gap-[4.5px] items-center">
              <img src={icLogo} alt="🐼" className="w-[40px] h-[40px]" />
              <img
                src={nameLogo}
                alt="판다마켓"
                className="w-[110px] h-[28px]"
              />
            </figure>
          </Link>
          {isMenuVisible && (
            <nav className="flex">
              {menus.map((menu) => (
                <NavLink
                  to={menu.path}
                  key={menu.title}
                  style={getLinkStyle}
                  className="px-[15px] py-[21px] text-[18px] font-[700] leading-[26px] text-secondary-600"
                >
                  {menu.title}
                </NavLink>
              ))}
            </nav>
          )}
        </section>
        <Button
          classNames={`${style.button.width} ${style.button.height} rounded-[8px] text-[16px] font-[600]`}
        >
          로그인
        </Button>
      </div>
    </header>
  );
}

export default Header;
