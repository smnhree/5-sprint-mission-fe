import Button from "../../common/Button";
import InputTextarea from "../../common/InputTextarea";
import RegistrationForm from "./components/RegistrationForm";
import Tag from "./components/Tag";

function RegistrationPage() {
  return (
    <main className="flex flex justify-center pt-[26px] pb-[162px]">
      <section className="flex flex-col items-start w-[1200px] gap-[29px]">
        <header className="w-full flex justify-between">
          <h1 className="text-[20px] font-[700] leading-[32px] text-secondary-800">
            상품 등록하기
          </h1>
          <Button isActive={false} classNames="rounded-[8px] w-[74px] h-[42px]">
            등록
          </Button>
        </header>
        <div className="flex flex-col gap-[16px] w-full">
          {/* todo: form placeholder을 children말고 prop으로 보내기 */}
          <RegistrationForm label="name" title="상품명">
            상품명을 입력해주세요
          </RegistrationForm>
          <RegistrationForm
            label="description"
            title="상품 소개"
            inputOrTextarea="textarea"
            inputClassNames="h-[282px]"
          >
            상품 소개를 입력해주세요
          </RegistrationForm>
          <RegistrationForm label="price" title="판매 가격">
            판매 가격을 입력해주세요
          </RegistrationForm>
          <RegistrationForm label="tag" title="태그" tag={<Tag>청소기</Tag>}>
            태그를 입력해주세요
          </RegistrationForm>
        </div>
      </section>
    </main>
  );
}

export default RegistrationPage;
