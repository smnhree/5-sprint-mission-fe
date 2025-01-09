import "./Input.css";

export function Input({ keyword, onChange }) {
  return (
    <form className="basic-input">
      <input
        value={keyword}
        placeholder="검색할 상품을 입력해주세요."
        onChange={onChange}
      />
    </form>
  );
}
