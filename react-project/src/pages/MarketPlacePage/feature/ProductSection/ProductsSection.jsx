import { Product } from "../ui/Product/Product";
import { productService } from "../../../../apis/ProductService";
import { useEffect, useState } from "react";
import { PaginationBtn } from "../ui/PaginationBtn/PaginationBtn";
import { ProductSearchForm } from "../ui/ProductSearchForm/ProductSearchForm";
import { ProductsSortDropdown } from "../ui/ProductsSortDropdown/ProductsSortDropdown";
import { Button } from "../../../../common/Button/Button";
import "./ProductsSection.css";

const REQUEST_PAGE_SIZE = 10;

export function ProductsSection() {
  // todo: state 깔끔하게 정리
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("recent");
  const [keyword, setKeyword] = useState("");

  // pagination 관련
  const [productsTotalCount, setProductsTotalCount] = useState(0);
  const [startPage, setStartPage] = useState(1);

  // dropdown 관련
  const [isSortDropdownActive, setIsSortDropdownActive] = useState(false);

  // 데이터 불러오는 함수
  const handleLoadProducts = async (options) => {
    const { list, totalCount } = await productService.getProductList(options);
    setProducts(() => list);
    setProductsTotalCount(() => totalCount);
  };

  // 디바운스 - 키워드 검색 관련
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedLoadProduct = debounce(handleLoadProducts, 500);

  // useEffect
  useEffect(() => {
    handleLoadProducts();
  }, []);

  useEffect(() => {
    handleLoadProducts({
      page: page,
      pageSize: REQUEST_PAGE_SIZE,
      orderBy: order,
      keyword: keyword,
    });
  }, [page, order]);

  useEffect(() => {
    debouncedLoadProduct({ keyword: keyword.trim() });
  }, [keyword]);

  // handle state(page, order, keyword) 함수
  const handlePage = (value) => {
    setPage(() => value);
  };

  const handleOrder = (value) => {
    setOrder(() => value);
    setStartPage(() => 1);
    handlePage(1);
    setIsSortDropdownActive((prev) => !prev);
  };

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  // dropdown 함수
  const toggleDropdown = () => {
    setIsSortDropdownActive((prev) => !prev);
  };

  // 페이지네이션
  const pageCount = Math.ceil(productsTotalCount / REQUEST_PAGE_SIZE);
  const pageArray = Array.from({ length: pageCount }, (_, i) => i + 1);
  const pageGroupSize = 5;
  const nextStartPage = startPage + pageGroupSize;
  const prevStartPage = startPage - pageGroupSize;
  const handleNextPageGroup = () => {
    if (nextStartPage <= pageCount) {
      setStartPage(() => nextStartPage);
    }
  };
  const handlePrevPageGroup = () => {
    if (prevStartPage > 0) {
      setStartPage(prevStartPage);
    }
  };

  return (
    <div className="products-section">
      <div className="section-top-wrap">
        <div className="section-title">판매 중인 상품</div>
        <div className="몰라">
          <ProductSearchForm keyword={keyword} onChange={handleKeyword} />
          <Button text="상품 등록하기" width="16rem" />
          <button className="sort-btn" onClick={toggleDropdown}>
            최신순
          </button>
          {isSortDropdownActive && (
            <ProductsSortDropdown onClick={handleOrder} />
          )}
        </div>
      </div>
      <div className="products">
        {products.map((item) => {
          const { id, images, name, price, favoriteCount } = item;
          return (
            <Product
              key={id}
              images={images}
              name={name}
              price={price}
              favoriteCount={favoriteCount}
              styleImgWidth="22.1rem"
            />
          );
        })}
      </div>
      <div className="page-btns">
        <button onClick={handlePrevPageGroup} disabled={prevStartPage < 0}>
          이전
        </button>
        {pageArray
          .slice(startPage - 1, startPage - 1 + pageGroupSize)
          .map((item) => (
            <PaginationBtn key={item} value={item} onClick={handlePage} />
          ))}
        <button
          onClick={handleNextPageGroup}
          disabled={nextStartPage > pageCount}
        >
          다음
        </button>
      </div>
    </div>
  );
}
