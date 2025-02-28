import { useQuery } from "@tanstack/react-query";
import { getBestArticleList, getArticleList } from "@/lib/apis/articles";
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
