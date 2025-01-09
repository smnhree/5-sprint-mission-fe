import { useEffect, useState } from "react";
import { useScreenType } from "../../../../hooks/useScreenType";
import { productService } from "../../../../services/ProductService";

import { ProductCard } from "../../../../components/ProductCard/ProductCard";
import { PageButton } from "../../../../components/button/pagination/PageButton/PageButton";
import { Input } from "../../../../components/Input/Input";
import { Dropdown } from "../../../../components/Dropdown/Dropdown";
import { PrimaryButton } from "../../../../components/button/PrimaryButton/PrimaryButton";
import { PageGroupChangeButton } from "../../../../components/button/pagination/PageGroupChangeButton/PageGroupChangeButton";

import "./ProductsList.css";

export function ProductsList() {
  // todo: state 깔끔하게 정리, isLoading 구현
  // 화면 사이즈
  const screenType = useScreenType();
  // 데이터 요청 관련 상태
  const [products, setProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [requestPageSize, setRequestPageSize] = useState(10);
  const [order, setOrder] = useState("recent");
  const [keyword, setKeyword] = useState("");
  // pagination 관련
  const [productsTotalCount, setProductsTotalCount] = useState(0);
  const [startPage, setStartPage] = useState(1);
  // dropdown 관련
  const [isSortDropdownActive, setIsSortDropdownActive] = useState(false);
  // loading 관련
  const [isLoading, setIsLoading] = useState(false);

  // 데이터 불러오는 함수
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
      page: activePage,
      pageSize: requestPageSize,
      orderBy: order,
      keyword: keyword.trim(),
    });
  }, [activePage, requestPageSize, order]);

  // keyword 변경 시 디바운스걸고 데이터 불러오기
  useEffect(() => {
    debouncedLoadProduct({
      page: activePage,
      pageSize: requestPageSize,
      orderBy: order,
      keyword: keyword.trim(),
    });
  }, [keyword]);

  // handle state(page, order, keyword) 함수
  const handlePage = (value) => {
    setActivePage(() => value);
  };

  const handleOrder = (value) => {
    setOrder(() => value);
    handlePage(1);
    setStartPage(() => 1);
    setIsSortDropdownActive((prev) => !prev);
  };

  const handleKeyword = (e) => {
    setKeyword(() => e.target.value);
  };

  // dropdown 함수
  const toggleDropdown = () => {
    setIsSortDropdownActive((prev) => !prev);
  };

  // 페이지네이션
  const pageCount = Math.ceil(productsTotalCount / requestPageSize);
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
    return page === activePage ? "active" : "";
  };

  // 화면 줄였다가 늘어날 때 현재 페이지에 데이터가 없다면 마지막 페이지로 이동
  const moveLastPage = () => {
    if (activePage > pagesArray.length) {
      setActivePage(pagesArray.length);
      setStartPage(pageCount);
    }
  };

  // 반응형 웹
  const imageWidth = screenType === "mobile" ? "16.8rem" : "22.1rem";

  useEffect(() => {
    if (screenType === "desktop") {
      setRequestPageSize(() => 10);
    } else if (screenType === "tablet") {
      setRequestPageSize(() => 6);
    } else if (screenType === "mobile") {
      setRequestPageSize(() => 4);
    }
  }, [screenType]);

  // useEffect(() => {
  //   const newLastPage = Math.ceil(productsTotalCount / requestPageSize);
  //   if (activePage > newLastPage) {
  //     let newStartPage;
  //     if (newLastPage % pageGroupSize === 0) {
  //       newStartPage = newLastPage - requestPageSize + 1;
  //     } else {
  //       newStartPage = newLastPage - (newLastPage % pageGroupSize) + 1;
  //     }
  //     setActivePage(newLastPage);
  //   } else {
  //     handleLoadProducts({
  //       page: activePage,
  //       pageSize: requestPageSize,
  //       orderBy: order,
  //       keyword: keyword.trim(),
  //     });
  //   }
  //   // setActivePage(pagesArray.length); // startPage가 문제야!
  // }, [requestPageSize]);

  return (
    <div className="products-list">
      <div className="top-wrap">
        <div className="list-title">판매 중인 상품</div>
        <div className="controller">
          <Input keyword={keyword} onChange={handleKeyword} />
          <PrimaryButton text="상품 등록하기" width="13.3rem" />
          {/* // todo: 아래 버튼과 dropdownbox 하나로 묶어서 컴포넌트로 하기 */}
          <div className="dropdown-wrap">
            <button className="dropdown-toggle-button" onClick={toggleDropdown}>
              최신순
            </button>
            {isSortDropdownActive && <Dropdown onClick={handleOrder} />}
          </div>
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
