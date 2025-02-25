import Head from "next/head";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";

export default function Board() {
  return (
    <>
      <Head>
        <title>판다마켓 | 중고 거래 플랫폼 - 게시글 쓰기</title>
      </Head>
      <main className="flex flex-col flex-grow gap-[24px]">
        <form>
          <div className="flex justify-between items-center">
            <h1 className="text-[20px] font-[700] text-gray-800">
              게시글 쓰기
            </h1>
            <Button onClick={() => {}} status="disabled">
              등록
            </Button>
          </div>
          <ul className="flex flex-col gap-[16px]">
            <li>
              <Input
                label="*제목"
                id="title"
                placeholder="제목을 입력해주세요"
              />
            </li>
            <li>
              <Textarea
                label="*내용"
                id="description"
                placeholder="내용을 입력해주세요"
                size="large"
              />
            </li>
          </ul>
        </form>
      </main>
    </>
  );
}
