import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getBestArticleList,
  getArticleList,
  getArticle,
  getArticleComments,
  createComment,
  updateComment,
  deleteComment,
} from "@/lib/apis/articles";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";

// Best Articles 목록 조회
export function useBestArticleList(limit = 3) {
  return useQuery({
    queryKey: QUERY_KEYS.Articles.best(limit),
    queryFn: () => getBestArticleList(limit),
  });
}

// Articles 목록 조회
export function useArticleList({
  offset = 0,
  limit = 5,
  sort = "recent",
  keyword = "",
}) {
  return useQuery({
    queryKey: QUERY_KEYS.Articles.list({ offset, limit, sort, keyword }),
    queryFn: () => getArticleList({ offset, limit, sort, keyword }),
  });
}

// Article 상세 조회
export function useArticle({ articleId }) {
  return useQuery({
    queryKey: QUERY_KEYS.Articles.detail(articleId),
    queryFn: () => getArticle({ articleId }),
  });
}

// Article Comments 조회
export function useArticleComments({ articleId }) {
  return useQuery({
    queryKey: QUERY_KEYS.Articles.comments.list(articleId),
    queryFn: () => getArticleComments({ articleId }),
  });
}

// Article Comment 작성
export function useCreateComment({
  articleId,
  username = "똑똑한 판다",
  content,
}) {
  return useMutation({
    mutationFn: () => createComment({ articleId, username, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        // 댓글 목록 새로고침(쿼리 무효화)
        queryKey: QUERY_KEYS.Articles.comments.list(articleId),
      });
    },
  });
}

// Article Comment 수정
export function useUpdateComment({ commentId, content }) {
  return useMutation({
    mutationFn: () => updateComment({ commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        // 댓글 새로 고침(list, detail)
        queryKey: ["articles", articleId, "comments"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

// Article Comment 삭제
export function useDeleteComment({ commentId }) {
  return useMutation({
    mutationFn: () => deleteComment({ commentId }),
    onSuccess: () => {
      // invalidateQueries(['articles', articleId, 'comments'])만 사용하면 댓글 목록 캐시만 무효화되고, 댓글 상세 캐시는 제거되지 않음
      queryClient.removeQueries({
        // 삭제된 댓글 캐시 제거
        queryKey: QUERY_KEYS.Articles.comments.detail(articleId, commentId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.Articles.comments.list(articleId),
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
