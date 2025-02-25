import Head from "next/head";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import Comment from "@/components/Comment";
import { getArticleDetail } from "@/lib/api";
import Post from "@/components/Post";
export async function getServerSideProps({ params }) {
  try {
    const { id } = params;
    const { article, comments } = await getArticleDetail({ articleId: id });
    console.log(article);
    return {
      props: { article: article.data, comments: comments.data },
    };
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    return {
      props: { article: null, comments: [] },
    };
  }
}

function ArticleDetail({ article, comments }) {
  return (
    <>
      <Head>
        <title>판다마켓 | 중고 거래 플랫폼 - 자유게시판</title>
      </Head>
      <main className="flex flex-col gap-[32px] py-[18px]">
        <section>
          <Post post={article} />
        </section>
        <section>
          <form className="flex flex-col gap-[16px]">
            <Textarea
              label="댓글달기"
              id="comment"
              placeholder="댓글을 입력해주세요."
            />
            <Button status="disabled" classNames="ml-auto">
              등록
            </Button>
          </form>
        </section>
        <section>
          <ul className="flex flex-col gap-[24px]">
            {comments.map((comment) => (
              <li key={comment.id}>
                <Comment comment={comment} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default ArticleDetail;
