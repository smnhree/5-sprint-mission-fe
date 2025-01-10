import "./Dropdown.css";

// todo: 재사용성 높게 만들기
export function Dropdown({ onClick }) {
  return (
    <div className="dropdown">
      <button className="recent" onClick={() => onClick("recent")}>
        최신순
      </button>
      <button className="favorite" onClick={() => onClick("favorite")}>
        좋아요순
      </button>
    </div>
  );
}
