import { Product } from "../ui/Product/Product";
import { productService } from "../../../../apis/ProductService";
import { useEffect, useState } from "react";
import { PaginationBtn } from "../ui/PaginationBtn/PaginationBtn";
import { ProductSearchForm } from "../ui/ProductSearchForm/ProductSearchForm";
import { ProductsSortDropdown } from "../ui/ProductsSortDropdown/ProductsSortDropdown";
import { Button } from "../../../../common/Button/Button";
import { PaginationGroupChangeBtn } from "../ui/PaginationGroupChangeBtn/PaginationGroupChangeBtn";
import "./ProductsSection.css";

const REQUEST_PAGE_SIZE = 10;

export function ProductsSection() {
  // todo: state 깔끔하게 정리, isLoading 구현
  const [products, setProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [order, setOrder] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // pagination 관련
  const [productsTotalCount, setProductsTotalCount] = useState(0);
  const [startPage, setStartPage] = useState(1);

  // dropdown 관련
  const [isSortDropdownActive, setIsSortDropdownActive] = useState(false);

  // 데이터 불러오는 함수
  const handleLoadProducts = async (options) => {
    let result;
    try {
      setIsLoading(true);
      result = await productService.getProductList(options);
    } catch (error) {
      console.error(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const { list, totalCount } = result;
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

  const debouncedLoadProduct = debounce(handleLoadProducts, 1000);

  // useEffect
  useEffect(() => {
    handleLoadProducts();
  }, []);

  useEffect(() => {
    handleLoadProducts({
      page: activePage,
      pageSize: REQUEST_PAGE_SIZE,
      orderBy: order,
      keyword: keyword,
    });
  }, [activePage, order]);

  useEffect(() => {
    debouncedLoadProduct({ keyword: keyword.trim() });
  }, [keyword]);

  // handle state(page, order, keyword) 함수
  const handlePage = (value) => {
    setActivePage(() => value);
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

  const getPaginationBtnClassName = (page) => {
    return page === activePage ? "active" : "";
  };

  return (
    <div className="products-section">
      <div className="section-top-wrap">
        <div className="section-title">판매 중인 상품</div>
        <div className="section-controller">
          <ProductSearchForm keyword={keyword} onChange={handleKeyword} />
          <Button text="상품 등록하기" width="13.3rem" />
          <div className="dropdown-wrap">
            <button className="sort-btn" onClick={toggleDropdown}>
              최신순
            </button>
            {isSortDropdownActive && (
              <ProductsSortDropdown onClick={handleOrder} />
            )}
          </div>
        </div>
      </div>
      {/* {isLoading && <div className="loadingMsg">로딩중</div>} */}
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
        {/* // todo: PaginationGroupChangeBtn arrow img로 교체 */}
        <PaginationGroupChangeBtn
          onClick={handlePrevPageGroup}
          disabled={prevStartPage < 0}
          arrow="<"
        />
        {pageArray
          .slice(startPage - 1, startPage - 1 + pageGroupSize)
          .map((item) => (
            <PaginationBtn
              key={item}
              value={item}
              onClick={handlePage}
              classNames={`pagination-btn ${getPaginationBtnClassName(item)}`}
            />
          ))}
        <PaginationGroupChangeBtn
          onClick={handleNextPageGroup}
          disabled={nextStartPage > pageCount}
          arrow=">"
        />
      </div>
    </div>
  );
}
