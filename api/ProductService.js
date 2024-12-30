import axios from 'axios';

export const productService = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
}

const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/"
})


const url = {
  origin: "https://sprint-mission-api.vercel.app/",
  pathName: "products/",
}

async function getProductList({ page = 1, pageSize = 100, keyword = "" } = {}) {
  const searchParams = { page, pageSize, keyword };
  try {
    const res = await instance.get("productsssss/", { params: searchParams });
    return res.data;
  } catch(e) {
    console.log("물품 목록을 불러오는데 실패했습니다.");
    console.log("상태 코드: ", e.response.status);
    console.log("오류 내용: ", e.response.data.message);
  }

}

async function getProduct(id) {
  try {
    const res = await instance.get(`products/${id}`);
    return res.data;
  } catch(e) {
    console.log("물품 정보를 불러오는데 실패했습니다.");
    console.log("상태 코드: ", e.response.status);
    console.log("오류 내용: ", e.response.data.message);
  }
}

async function createProduct(newData) {
  try {
    const res = await instance.post("products/", {
      name: newData.name,
      description: newData.description,
      price: newData.price,
      tags: newData.tags,
      images: newData.images
    });
    return res.data;
  } catch(e) {
    console.log("새로운 물품을 생성하는데 실패했습니다.");
    console.log("상태 코드: ", e.response.status);
    console.log("오류 내용: ", e.response.data.message);
  }
}

async function patchProduct(id, updatedData) {
  try {
    const res = await instance.patch(`products/${id}`, {
      name: updatedData.name,
      description: updatedData.description,
      price: updatedData.price,
      tags: updatedData.tags,
      images: updatedData.images
    });
    return res.data;
  } catch(e) {
    console.log("물품 정보를 수정하는데 실패했습니다.");
    console.log("상태 코드: ", e.response.status);
    console.log("오류 내용: ", e.response.data.message);
  }
}

async function deleteProduct(id) {
  try {
    const res = await instance.delete(`products/${id}`);
    console.log("게시글을 삭제하였습니다.")
    // todo: 무엇을 return 해야 할까..
  } catch(e) {
    console.log("물품을 삭제하는데 실패했습니다.");
    console.log("상태 코드: ", e.response.status);
    console.log("오류 내용: ", e.response.data.message);
  }
}