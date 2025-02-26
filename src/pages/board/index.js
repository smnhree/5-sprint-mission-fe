import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import BestArticlePreview from "./_components/BestArticlePreview";
import ArticlePreview from "./_components/ArticlePreview";

import Button from "@/components/Button";
import SearchInput from "@/components/SearchInput";
import PaginationBar from "@/components/PaginationBar";

import { getBestArticles, getArticleList } from "@/lib/api";

const SortDropDown = dynamic(() => import("@/components/SortDropDown"), {
  ssr: false,
});

const PAGE_LIMIT = 5;
const BEST_ARTICLE_LIMIT = 3;
const BEST_ARTICLE_STYLES = {
  base: "block flex-1", // 1번째: 모바일, 태블릿, PC
  second: "hidden md:block flex-1", // 2번째: 태블릿, PC
  third: "hidden md:hidden xl:block flex-1", // 3번째: PC
  getClassNames(index) {
    switch (index) {
      case 1:
        return `${this.base} ${this.second}`;
      case 2:
        return `${this.base} ${this.third}`;
      default:
        return this.base;
    }
  },
};

export async function getServerSideProps(context) {
  const { offset = 0, limit = 5, sort = "recent", keyword } = context.query;

  // 초기 렌더링 시 keyword를 url에 제거
  if (keyword === "") {
    const newQuery = new URLSearchParams({ offset, limit, sort }).toString();
    return {
      redirect: {
        destination: `/board?${newQuery}`,
        permanent: false,
      },
    };
  }

  try {
    const [bestArticles, articles] = await Promise.all([
      getBestArticles(BEST_ARTICLE_LIMIT),
      getArticleList({ offset, limit, sort, keyword }),
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
      props: { bestArticles: [], articles: [], totalCount: 0 },
    };
  }
}

export default function Board({ bestArticles, articles, totalCount }) {
  const router = useRouter();
  const currentSort = router.query.sort || "recent";
  const currentPage = parseInt(router.query.offset) + 1 || 1;
  const pageCount = Math.ceil(totalCount / PAGE_LIMIT);

  const handleSortChange = (sort) => {
    if (sort === currentSort) return;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort },
    });
  };

  const handlePageChange = (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, offset: (page - 1) * PAGE_LIMIT },
    });
  };

  const displaySort = currentSort === "recent" ? "최신순" : "좋아요순";

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
              <li
                key={article.id}
                className={BEST_ARTICLE_STYLES.getClassNames(index)}
              >
                <Link href={`board/${article.id}`}>
                  <BestArticlePreview article={article} />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-[16px]">
          <header className="flex justify-between items-center">
            <h1 className="text-[18px] md:text-[20px] font-[700] text-gray-800">
              게시글
            </h1>
            <Button onClick={() => router.push("/board/write")}>글쓰기</Button>
          </header>

          <div className="flex flex-col gap-[24px]">
            <div className="flex justify-between items-center gap-[13px]">
              <SearchInput placeholder="검색할 상품을 입력해주세요" />
              <SortDropDown
                selectedSort={displaySort}
                onSortChange={handleSortChange}
              />
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
              <PaginationBar
                currentPage={currentPage}
                pageCount={pageCount}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
}
