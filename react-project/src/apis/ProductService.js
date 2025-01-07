import axios from "axios";

export const productService = {
  getProductList,
};

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app/",
});

const endpoint = "products/";

async function getProductList({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) {
  const searchParams = { page, pageSize, orderBy, keyword };
  try {
    const res = await instance.get(endpoint, { params: searchParams });
    return res.data;
  } catch (e) {
    return e;
  }
}
