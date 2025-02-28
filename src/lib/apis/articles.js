// queryFn 함수 정의

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Best Articles 목록 조회
export async function getBestArticleList(limit = 3) {
  const { data } = await axios.get(`${API_URL}/articles/`, {
    params: {
      limit,
      sort: "likeCount",
    },
  });
  return data;
}

// Articles 목록 조회
export async function getArticleList({
  offset = 0,
  limit = 5,
  sort = "recent",
  keyword = "",
} = {}) {
  const { data } = await axios.get(`${API_URL}/articles/`, {
    params: {
      offset,
      limit,
      sort,
      keyword,
    },
  });
  return data;
}
