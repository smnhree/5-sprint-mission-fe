import { Link } from "react-router-dom";
import Item from "./components/item.jsx";
import Button from "../../common/Button.jsx";
import InputTextarea from "../../common/InputTextarea.jsx";
import dropDownArrowIcon from "../../assets/icon/ic_dropdown_arrow.png";
import PageButton from "./components/PageButton.jsx";
import MOCK_DATA from "./mockData.js";
import { useState } from "react";

function ItemsPage() {
  const [pageSize, setPageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);

  const pageCount = Math.ceil(MOCK_DATA.length / pageSize);
  const pageArray = Array.from({ length: pageCount }, (_, index) => index + 1);

  const startIndex = pageSize * (activePage - 1);
  const data = MOCK_DATA.slice(startIndex, startIndex + pageSize);

  return (
    <main className="flex justify-center pt-[26px] pb-[140px]">
      <section className="w-[1200px] flex flex-col gap-[24px]">
        <header className="flex justify-between">
          <h1 className="text-[20px] font-[700] text-secondary-800">
            판매 중인 상품
          </h1>
          <div className="flex items-center gap-[12px]">
            <InputTextarea
              InputOrTextarea="input"
              placeholder="검색할 상품을 입력해주세요"
              classNames="w-[325px] h-[42px] px-[20px] py-[9px]"
            />
            <Link to="/registration">
              <Button classNames="w-[133px] h-[42px] rounded-[8px]">
                상품 등록하기
              </Button>
            </Link>
            <div className="flex items-center justify-between w-[130px] h-[42px] px-[20px] py-[12px] rounded-[12px] border-[1px] border-secondary-200">
              <span className="text-[16px] font-[400] text-secondary-800">
                최신순
              </span>
              <img
                src={dropDownArrowIcon}
                alt="▼"
                className="w-[15.7px] h-[7.42px]"
              />
            </div>
          </div>
        </header>
        <ul className="grid grid-cols-5 gap-[24px]">
          {data.map((item) => (
            <Item
              name={item.title}
              price={item.price}
              favoriteCount={item.favorite}
            />
          ))}
        </ul>
        <footer className="flex justify-center gap-[4px] pt-[19px]">
          <PageButton content="<" />
          {pageArray.map((page) => (
            <PageButton content={page} />
          ))}
          <PageButton content=">" />
        </footer>
      </section>
    </main>
  );
}

export default ItemsPage;
