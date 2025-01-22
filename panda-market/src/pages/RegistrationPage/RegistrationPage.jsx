import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import InputTextarea from "../../common/InputTextarea";
import Tag from "./components/Tag";
import productService from "../../services/ProductService";

function RegistrationPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProductId = await productService.postNewProduct(formValues);
      navigate(`/items/${newProductId}`);
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return (
    <main className="flex flex justify-center pt-[26px] pb-[162px]">
      <form
        className="flex flex-col items-start w-[1200px] gap-[29px]"
        onSubmit={handelSubmit}
      >
        <header className="w-full flex justify-between">
          <h1 className="text-[20px] font-[700] leading-[32px] text-secondary-800">
            상품 등록하기
          </h1>
          <Button
            isActive={false}
            classNames="rounded-[8px] w-[74px] h-[42px]"
            type="submit"
          >
            등록
          </Button>
        </header>
        <fieldset className="flex flex-col gap-[16px] w-full">
          <div className="flex flex-col w-full items-start gap-[16px]">
            <label
              htmlFor="name"
              className="text-[18px] font-[700] leading-[26px] text-secondary-800"
            >
              상품명
            </label>
            <InputTextarea
              id="name"
              placeholder="상품명을 입력해주세요"
              classNames="w-full"
              name="name"
            />
          </div>
          <div className="flex flex-col w-full items-start gap-[16px]">
            <label
              htmlFor="description"
              className="text-[18px] font-[700] leading-[26px] text-secondary-800"
            >
              상품 소개
            </label>
            <InputTextarea
              id="description"
              placeholder="상품 소개를 입력해주세요"
              InputOrTextarea="textarea"
              classNames="w-full h-[282px]"
              name="description"
            />
          </div>
          <div className="flex flex-col w-full items-start gap-[16px]">
            <label
              htmlFor="price"
              className="text-[18px] font-[700] leading-[26px] text-secondary-800"
            >
              판매 가격
            </label>
            <InputTextarea
              id="price"
              placeholder="판매 가격을 입력해주세요"
              classNames="w-full"
              name="price"
            />
          </div>
          <div className="flex flex-col w-full items-start gap-[16px]">
            <label
              htmlFor="tag"
              className="text-[18px] font-[700] leading-[26px] text-secondary-800"
            >
              태그
            </label>
            <InputTextarea
              id="tags"
              placeholder="태그를 입력해주세요"
              classNames="w-full"
              name="tags"
              value={tagInput}
            />
          </div>
        </fieldset>
        <div>
          {formValues.tags.map((tag, index) => (
            <Tag index={index} onClickRemoveButton={handleTagRemove}>
              {tag}
            </Tag>
          ))}
        </div>
      </form>
    </main>
  );
}

export default RegistrationPage;
