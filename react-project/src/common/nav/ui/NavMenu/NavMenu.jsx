import "./NavMenu.css";

const style = {
  padding: "2.1rem 1.5rem",
  fontSize: "1.8rem",
  fontWeight: "700",
  lineHeight: "2.6rem",
  textAlign: "center",
};

export function NavMenu({ menuName }) {
  return <a style={style}>{menuName}</a>; // .nav-menu
}
