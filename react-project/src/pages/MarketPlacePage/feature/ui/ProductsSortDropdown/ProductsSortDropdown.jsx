import "./ProductsSortDropdown.css";

export function ProductsSortDropdown({ onClick }) {
  return (
    <div className="최신순좋아요순">
      <button className="최신순" onClick={() => onClick("recent")}>
        최신순
      </button>
      <button className="좋아요순" onClick={() => onClick("favorite")}>
        좋아요순
      </button>
    </div>
  );
}
