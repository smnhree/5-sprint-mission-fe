import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 게시글 목록 조회
export async function getArticleList({
  offset = 0,
  limit = 5,
  sort = "recent",
  keyword = "",
} = {}) {
  const response = await axios.get(`${API_URL}/articles/`, {
    params: {
      offset,
      limit,
      sort,
      keyword,
    },
  });
  return response.data;
}

// 베스트 게시글 조회
export async function getBestArticles(limit = 1) {
  const response = await axios.get(`${API_URL}/articles/`, {
    params: {
      limit,
      sort: "likeCount",
    },
  });
  return response.data;
}

// 게시글 조회
async function getArticle(articleId) {
  const { data } = await axios.get(`${API_URL}/articles/${articleId}`);
  return data;
}

// 게시글 상세 조회 + 게시글 댓글 조회
export async function getArticleDetail({ articleId }) {
  try {
    const [articleData, commentsData] = await Promise.all([
      getArticle(articleId),
      getArticleComments(articleId),
    ]);

    return {
      article: articleData,
      comments: commentsData,
    };
  } catch (error) {
    throw new Error(`게시글 조회 중 오류 발생: ${error.message}`);
  }
}

// 게시글 작성
export async function createArticle({
  username = "총명한 판다",
  title,
  content,
  images = [],
}) {
  const response = await axios.post(`${API_URL}/articles`, {
    username,
    title,
    content,
    images,
  });
  return response.data.data.id;
}

// 게시글 수정
export async function updateArticle(
  articleId, // articleId는 필수 파라미터
  { username, title, content, image = [] } = {}
) {
  const updateData = {
    ...(username && { username }),
    ...(title && { title }),
    ...(content && { content }),
    ...(image.length > 0 && { image }),
  };

  const response = await axios.patch(
    `${API_URL}/articles/${articleId}`,
    updateData
  );
}

// 게시글 삭제
export async function deleteArticle(articleId) {
  await axios.delete(`${API_URL}/articles/${articleId}`);
}

// 게시글 댓글 조회
async function getArticleComments(articleId) {
  const { data } = await axios.get(`${API_URL}/articles/${articleId}/comments`);
  return data;
}

// 게시글 댓글 작성
export async function createComment(
  articleId,
  { username = "똑똑한 판다", content }
) {
  const { data } = await axios.post(
    `${API_URL}/articles/${articleId}/comments`,
    {
      username,
      content,
    }
  );
  return data;
}

// 게시글 댓글 수정
export async function updateComment(commentId, { username, content }) {
  await axios.patch(`${API_URL}/comments/${commentId}`, {
    username,
    content,
  });
}

// 게시글 댓글 삭제
export async function deleteComment(commentId) {
  await axios.delete(`${API_URL}/articles/comments/${commentId}`);
}
