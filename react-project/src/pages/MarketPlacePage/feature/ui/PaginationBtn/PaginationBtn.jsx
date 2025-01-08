import "./PaginationBtn.css";

export function PaginationBtn({ value, onClick, classNames }) {
  return (
    <button className={classNames} onClick={() => onClick(value)}>
      {value}
    </button>
  );
}
