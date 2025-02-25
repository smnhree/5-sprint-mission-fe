import Head from "next/head";
import BestArticlePreview from "./_components/BestArticlePreview";
import Button from "@/components/Button";
import ArticlePreview from "./_components/ArticlePreview";
import SearchInput from "@/components/SearchInput";
import SortDropDown from "@/components/SortDropDown";
import { useRouter } from "next/router";
import { getBestArticles, getArticleList } from "@/lib/api";
import Link from "next/link";
import PaginationButtons from "@/components/PaginationButtons";
const PAGE_LIMIT = 5;

export async function getServerSideProps(context) {
  const { offset = 0, limit = 5 } = context.query;

  try {
    const [bestArticles, articles] = await Promise.all([
      getBestArticles(3),
      getArticleList({ offset, limit }),
    ]);
    return {
      props: {
        bestArticles: bestArticles.data,
        articles: articles.data,
        totalCount: articles.totalCount,
      },
    };
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    return {
      props: { bestArticles: [], articles: [] },
    };
  }
}

const bestArticleStyles = {
  base: "block flex-1", // 1번째: 모바일, 태블릿, PC
  second: "hidden md:block flex-1", // 2번째: 태블릿, PC
  third: "hidden md:hidden xl:block flex-1", // 3번째: PC
};

export default function Board({ bestArticles, articles, totalCount }) {
  const router = useRouter();

  const getArticleClassName = (index) => {
    switch (index) {
      case 1:
        return `${bestArticleStyles.base} ${bestArticleStyles.second}`;
      case 2:
        return `${bestArticleStyles.base} ${bestArticleStyles.third}`;
      default:
        return bestArticleStyles.base;
    }
  };

  const pageCount = Math.ceil(totalCount / PAGE_LIMIT);

  return (
    <>
      <Head>
        <title>판다마켓 | 중고 거래 플랫폼 - 자유게시판</title>
      </Head>
      <main className="flex flex-col gap-[24px]">
        <section>
          <h1 className="text-[18px] md:text-[20px] font-[700] text-gray-800">
            베스트 게시글
          </h1>
          <ul className="flex gap-[24px] items-center pt-[16px]">
            {bestArticles.slice(0, 3).map((article, index) => (
              <li key={article.id} className={getArticleClassName(index)}>
                <Link href={`board/${article.id}`}>
                  <BestArticlePreview article={article} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-[16px]">
          <div className="flex justify-between items-center">
            <h1 className="text-[18px] md:text-[20px] font-[700] text-gray-800">
              게시글
            </h1>
            <Button onClick={() => router.push("/board/write")}>글쓰기</Button>
          </div>
          <div className="flex flex-col gap-[24px]">
            <div className="flex justify-between items-center gap-[13px]">
              <SearchInput placeholder="검색할 상품을 입력해주세요" />
              <SortDropDown />
            </div>
            <ul className="flex flex-col gap-[24px]">
              {articles.map((article) => (
                <li key={article.id}>
                  <Link href={`/board/${article.id}`}>
                    <ArticlePreview article={article} />
                  </Link>
                </li>
              ))}
            </ul>
            {pageCount > 1 && (
              <PaginationButtons pageCount={pageCount} pageLimit={PAGE_LIMIT} />
            )}
          </div>
        </section>
      </main>
    </>
  );
}
