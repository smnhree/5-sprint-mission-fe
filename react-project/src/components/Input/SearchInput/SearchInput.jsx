import "./SearchInput.css";

export function SearchInput({ keyword, onChange, width = "32.5rem" }) {
  // todo: todo: 스타일(인라인/css/...) 통일하기

  const inputStyle = {
    width,
  };

  return (
    <form className="search-input">
      <input
        value={keyword}
        placeholder="검색할 상품을 입력해주세요."
        onChange={onChange}
        style={inputStyle}
      />
    </form>
  );
}
