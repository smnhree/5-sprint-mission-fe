import "./PageGroupChangeButton.css";

export function PageGroupChangeButton({ onClick, disabled, arrow }) {
  return (
    <button
      className="pagination-group-change-button"
      onClick={onClick}
      disabled={disabled}
    >
      {arrow}
    </button>
  );
}
