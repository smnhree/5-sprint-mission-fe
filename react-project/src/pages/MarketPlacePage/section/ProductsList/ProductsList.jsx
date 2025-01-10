import { useEffect, useState } from "react";
import { useScreenType } from "../../../../hooks/useScreenType";
import { productService } from "../../../../services/ProductService";
import { ProductCard } from "../../../../components/ProductCard/ProductCard";
import { PageButton } from "../../../../components/button/pagination/PageButton/PageButton";
import { SearchInput } from "../../../../components/Input/SearchInput/SearchInput";
import { Dropdown } from "../../../../components/Dropdown/Dropdown";
import { PrimaryButton } from "../../../../components/button/PrimaryButton/PrimaryButton";
import { PageGroupChangeButton } from "../../../../components/button/pagination/PageGroupChangeButton/PageGroupChangeButton";
import arrowDownIc from "../../../../assets/icons/arrow_down.png";
import sortIc from "../../../../assets/icons/sort.png";
import "./ProductsList.css";

export function ProductsList() {
  // todo: state 깔끔하게 정리, isLoading 구현
  const screenType = useScreenType();
  const [products, setProducts] = useState([]);
  const [productsListOption, setProductsListOption] = useState({
    activePage: 1,
    requestPageSize: 10,
    order: "recent",
    keyword: "",
  });
  const [productsTotalCount, setProductsTotalCount] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 데이터 불러오기
  const handleLoadProducts = async (options) => {
    let result;
    try {
      setIsLoading(true);
      result = await productService.getProductList(options);
    } catch (error) {
      console.error(error); // todo: 이거 에러 처리 임시로 한 것.. 구체적으로 구현하기
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
  // 초기 데이터 불러오기
  useEffect(() => {
    handleLoadProducts();
  }, []);

  // page, screenType, order 변경 시 데이터 불러오기
  useEffect(() => {
    handleLoadProducts({
      page: productsListOption.activePage,
      pageSize: productsListOption.requestPageSize,
      orderBy: productsListOption.order,
      keyword: productsListOption.keyword,
    });
  }, [
    productsListOption.activePage,
    productsListOption.requestPageSize,
    productsListOption.order,
  ]);

  // keyword 변경 시 디바운스걸고 데이터 불러오기
  useEffect(() => {
    debouncedLoadProduct({
      page: productsListOption.activePage,
      pageSize: productsListOption.requestPageSize,
      orderBy: productsListOption.order,
      keyword: productsListOption.keyword,
    });
  }, [productsListOption.keyword]);

  // handle state(page, order, keyword) 함수
  const handlePage = (value) => {
    setProductsListOption((prev) => ({
      ...prev,
      activePage: value,
    }));
  };

  const handleOrder = (value) => {
    setProductsListOption((prev) => ({
      ...prev,
      activePage: 1,
      order: value,
    }));
    setStartPage(() => 1);
    setIsDropdownActive((prev) => !prev);
  };

  const handleKeyword = (e) => {
    setProductsListOption((prev) => ({
      ...prev,
      keyword: e.target.value,
    }));
  };

  // dropdown 함수
  const toggleDropdown = () => {
    setIsDropdownActive((prev) => !prev);
  };

  // 페이지네이션
  const pageCount = Math.ceil(
    productsTotalCount / productsListOption.requestPageSize
  );
  const pagesArray = Array.from({ length: pageCount }, (_, i) => i + 1);
  const pageGroupSize = 5;
  const nextStartPage = startPage + pageGroupSize;
  const prevStartPage = startPage - pageGroupSize;
  // 페이지 그룹 바꾸는 함수
  const handlePageGroup = {
    next: () => {
      if (nextStartPage <= pageCount) {
        setStartPage(() => nextStartPage);
      }
    },
    prev: () => {
      if (prevStartPage > 0) {
        setStartPage(prevStartPage);
      }
    },
  };
  // 페이지 버튼 클릭 시 색깔 바꾸는 함수 todo: 이렇게 말고 다르게 해보기
  const getPaginationBtnClassName = (page) => {
    return page === productsListOption.activePage ? "active" : "";
  };

  // 반응형 웹
  const imageWidth = screenType === "mobile" ? "16.8rem" : "22.1rem";

  useEffect(() => {
    if (screenType === "desktop") {
      setProductsListOption((prev) => ({
        ...prev,
        activePage: 1,
        requestPageSize: 10,
      }));
    } else if (screenType === "tablet") {
      setProductsListOption((prev) => ({
        ...prev,
        activePage: 1,
        requestPageSize: 6,
      }));
    } else if (screenType === "mobile") {
      setProductsListOption((prev) => ({
        ...prev,
        activePage: 1,
        requestPageSize: 4,
      }));
    }
    setStartPage(1);
  }, [screenType]);

  return (
    <div className={`products-list ${screenType}`}>
      <div className={`top-wrap ${screenType}`}>
        <div className="list-title">판매 중인 상품</div>
        <div className="search-input-wrap">
          <SearchInput
            keyword={productsListOption.keyword}
            onChange={handleKeyword}
            width={
              screenType === "tablet"
                ? "24.2rem"
                : screenType === "mobile"
                ? "28.8rem"
                : "32.5rem"
            }
          />
        </div>
        <div className="upload-button-wrap">
          <PrimaryButton text="상품 등록하기" width="13.3rem" />
        </div>
        {/* // todo: 아래 버튼과 dropdownbox 하나로 묶어서 컴포넌트로 하기 */}
        <div className="dropdown-wrap">
          {screenType !== "mobile" && (
            <button
              className={`dropdown-toggle-button ${screenType}`}
              onClick={toggleDropdown}
            >
              <span className="order-text">
                {productsListOption.order === "recent" ? "최신순" : "좋아요순"}
              </span>
              <img className="arrow-down" src={arrowDownIc} alt="click" />
            </button>
          )}
          {isDropdownActive && <Dropdown onClick={handleOrder} />}
          {screenType === "mobile" && (
            <button
              className={`dropdown-toggle-button ${screenType}`}
              onClick={toggleDropdown}
            >
              <img className="sortIc" src={sortIc} alt="정렬" />
            </button>
          )}
          {isDropdownActive && <Dropdown onClick={handleOrder} />}
        </div>
      </div>
      {/* {isLoading && <div className="loadingMsg">로딩중</div>} */}
      <div className={`products ${screenType}`}>
        {products.map((item) => {
          const { id, images, name, price, favoriteCount } = item;
          return (
            <ProductCard
              key={id}
              images={images}
              name={name}
              price={price}
              favoriteCount={favoriteCount}
              imgWidth={imageWidth}
            />
          );
        })}
      </div>

      <div className="page-btns">
        {/* // todo: PaginationGroupChangeBtn arrow img로 교체 */}
        <PageGroupChangeButton
          onClick={handlePageGroup.prev}
          disabled={prevStartPage < 0}
          arrow="<"
        />
        {pagesArray
          .slice(startPage - 1, startPage - 1 + pageGroupSize)
          .map((item) => (
            <PageButton
              key={item}
              value={item}
              onClick={handlePage}
              classNames={`pagination-btn ${getPaginationBtnClassName(item)}`}
            />
          ))}
        <PageGroupChangeButton
          onClick={handlePageGroup.next}
          disabled={nextStartPage > pageCount}
          arrow=">"
        />
      </div>
    </div>
  );
}
