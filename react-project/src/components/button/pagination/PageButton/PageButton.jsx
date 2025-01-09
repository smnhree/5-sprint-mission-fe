import "./PageButton.css";

export function PageButton({ value, onClick, classNames }) {
  return (
    <button className={classNames} onClick={() => onClick(value)}>
      {value}
    </button>
  );
}
