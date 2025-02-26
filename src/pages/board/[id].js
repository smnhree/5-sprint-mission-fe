import Head from "next/head";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import Comment from "@/components/Comment";
import { getArticleDetail, createComment, deleteComment } from "@/lib/api";
import Post from "@/components/Post";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

export async function getServerSideProps({ params }) {
  try {
    const { id } = params;
    const { article, comments } = await getArticleDetail({ articleId: id });
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

function ArticleDetail({ article, comments: initialComments }) {
  const [comments, setComments] = useState(initialComments);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      comment: "",
    },
    mode: "onChange",
  });

  const buttonStatus = isDirty && isValid ? "active" : "disabled";

  const onSubmit = async (data) => {
    try {
      const response = await createComment(article.id, {
        content: data.comment,
      });
      setComments([...comments, response.data]); // 댓글 목록 업데이트 (자동 재렌더링)
      reset(); // 댓글 입력 필드를 비움
    } catch (error) {
      console.error("댓글 생성 실패:", error);
    }
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[16px]"
          >
            <Controller
              control={control}
              name="comment"
              rules={{
                required: "댓글을 입력해주세요.",
              }}
              render={({ field: { value, onChange, ...field } }) => (
                <Textarea
                  label="댓글달기"
                  id="comment"
                  placeholder="댓글을 입력해주세요."
                  value={value}
                  onChange={onChange}
                  {...field}
                />
              )}
            />
            <Button type="submit" status={buttonStatus} classNames="ml-auto">
              등록
            </Button>
          </form>
        </section>
        <section>
          <ul className="flex flex-col gap-[24px]">
            {comments.map((comment) => (
              <li key={comment.id}>
                <Comment comment={comment} onDelete={handleDeleteComment} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default ArticleDetail;
