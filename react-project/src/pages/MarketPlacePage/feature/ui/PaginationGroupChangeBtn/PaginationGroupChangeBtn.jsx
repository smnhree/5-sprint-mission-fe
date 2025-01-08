import "./PaginationGroupChangeBtn.css";

export function PaginationGroupChangeBtn({ onClick, disabled, arrow }) {
  return (
    <button
      className="pagination-group-change-btn"
      onClick={onClick}
      disabled={disabled}
    >
      {arrow}
    </button>
  );
}
