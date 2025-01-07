import "./PaginationBtn.css";

export function PaginationBtn({ value, onClick }) {
  return (
    <button className="PaginationBtn" onClick={() => onClick(value)}>
      {value}
    </button>
  );
}
