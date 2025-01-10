import "./SearchInput.css";

export function SearchInput({ keyword, onChange, width = "32.5rem" }) {
  // todo: style 인라인, css 정리

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
