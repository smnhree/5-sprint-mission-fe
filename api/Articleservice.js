// todo: throw new error(이 안에 뭘 넣을까...)
export const articleService = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
}

const url = {
  origin: "https://sprint-mission-api.vercel.app/",
  pathName: "articles/",
}

async function getArticleList({ page = 1, pageSize = 100, keyword = ""} = {}) {
	const requestUrl = new URL(`${url.origin}${url.pathName}`);
  const searchParams = { page, pageSize, keyword};
  for (const [key, value] of Object.entries(searchParams)) {
    requestUrl.searchParams.append(key, value);
  }

  return fetch(requestUrl)
    .then((res) => {
      if (!res.ok) { // todo: res.status로 코드 분기
        // res.json().then((ErrorData) => console.log(ErrorData));
        throw new Error(`${res.status} error`);
      }
      return res.json();
    })
    .then((data) => data)
    .catch((e) => {
      console.log("게시글 목록을 불러오는데 실패했습니다.");
      return e.message;
    });
}

async function getArticle(id) {
  return fetch(`${url.origin}${url.pathName}${id}`)
    .then((res) => {
      if (!res.ok) {
        // res.json().then((ErrorData) => console.log(ErrorData));
        throw new Error(`${res.status} error`);
      }
      return res.json();
    })
    .then((data) => data)
    .catch((e) => {
      console.log("게시글을 불러오는데 실패했습니다.");
      return e.message;
    });
}

async function createArticle(newData) {
  return fetch(`${url.origin}${url.pathName}`, {
		method: "POST",
    headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
      title: newData.title,
      content: newData.content,
      image: newData.image
    })
  })
  .then((res) => {
    if (!res.ok) {
      // res.json().then((ErrorData) => console.log(ErrorData));
      throw new Error(`${res.status} error`);
    }
    return res.json();
  })
  .then((data) => data)
  .catch((e) => {
    console.log("게시글을 생성하는데 실패했습니다.")
    return e.message
  });
}

async function patchArticle(id, updatedData) {
  return fetch(`${url.origin}${url.pathName}${id}`, {
		method: "PATCH",
    headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
      title: updatedData.title,
      content: updatedData.content,
      image: updatedData.image
    })
	})
  .then((res) => {
    if (!res.ok) {
      // res.json().then((ErrorData) => console.log(ErrorData));
      throw new Error("Error");
    }
    return res.json();
  })
  .then((data) => data)
  .catch((e) => {
    console.log("게시글을 수정하는데 실패했습니다.");
    return e.message;
  });
}

async function deleteArticle(id) {
  return fetch(`${url.origin}${url.pathName}${id}`, {
		method: "DELETE",
    headers: {
			"Content-Type": "application/json",
		},
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} error`);
    }
    console.log("게시글을 삭제하였습니다.")
    // todo: 무엇을 return 해야 할까..
  })
  .catch((e) => {
    console.log("게시글을 삭제하는데 실패하였습니다.")
    return e.message;
  });
}