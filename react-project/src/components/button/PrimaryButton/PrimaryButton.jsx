export function PrimaryButton({ text, width = "8.8rem" }) {
  let style = {
    width,
    height: "4.2rem",
    borderRadius: "0.8rem",
    padding: "1.2rem 2.3rem",
    backgroundColor: "var(--primary-color-100",
    fontSize: "1.6rem",
    lineHeight: "26rem",
    color: "var(--secondary-color-100)",
  };
  style.width = width;
  return <button style={style}>{text}</button>;
}
