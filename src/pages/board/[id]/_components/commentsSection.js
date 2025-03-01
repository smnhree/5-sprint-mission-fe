import Comment from "@/components/Comment";
import { deleteComment, updateComment } from "@/lib/api";

export default function CommentsSection({
  comments,
  setComments,
  editingCommentId,
  setEditingCommentId,
  editingContent,
  setEditingContent,
}) {
  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  // 수정 모드 시작
  const handleEditStart = (comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  // 수정 취소
  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditingContent("");
  };

  // 수정 완료
  const handleEditComplete = async (commentId) => {
    try {
      await updateComment(commentId, { content: editingContent });
      // 수정된 내용으로 comments 상태 업데이트
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editingContent }
            : comment
        )
      );
      // 수정 모드 종료
      setEditingCommentId(null);
      setEditingContent("");
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  return (
    <section>
      <ul className="flex flex-col gap-[24px]">
        {comments.map((comment) => (
          <li key={comment.id}>
            <Comment
              comment={comment}
              onDelete={handleDeleteComment}
              isEditing={editingCommentId === comment.id}
              editingContent={editingContent}
              onEditStart={() => handleEditStart(comment)}
              onEditCancel={handleEditCancel}
              onEditComplete={() => handleEditComplete(comment.id)}
              onEditChange={(e) => setEditingContent(e.target.value)}
              value={editingContent}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
