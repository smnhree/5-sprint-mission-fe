import MOCK_DATA from "./mockData.js";

function getRenderingData(offset, limit, order = "recent") {
  console.log("데이터를 성공적으로 불러왔습니다.");
  const sortedData =
    order === "favorite"
      ? [...MOCK_DATA].sort((a, b) => b.favorite - a.favorite)
      : [...MOCK_DATA].sort((a, b) => b.id - a.id);
  console.log("api", {
    data: sortedData.slice(offset, offset + limit),
    totalCount: sortedData.length,
  });
  return {
    renderingData: sortedData.slice(offset, offset + limit),
    totalCount: sortedData.length,
  };
}

export default getRenderingData;
