import "./ProductSearchForm.css";

export function ProductSearchForm({ keyword, onChange }) {
  return (
    <form className="product-search-form">
      <input
        value={keyword}
        placeholder="검색할 상품을 입력해주세요."
        onChange={onChange}
      />
    </form>
  );
}
