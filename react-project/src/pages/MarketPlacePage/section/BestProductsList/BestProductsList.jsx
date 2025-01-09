import { useEffect, useState } from "react";
import { useScreenType } from "../../../../hooks/useScreenType";
import { productService } from "../../../../services/ProductService";
import { ProductCard } from "../../../../components/ProductCard/ProductCard";
import "./BestProductsList.css";

export function BestProductsList() {
  const [products, setProducts] = useState([]);
  const screenType = useScreenType();

  // todo: handleLoadProducts 분리 생각해보기
  const handleLoadProducts = async (options) => {
    const { list } = await productService.getProductList(options);
    setProducts(list);
  };

  const imageWidth = screenType === "desktop" ? "28.2rem" : "34.3rem";

  // 초기 데이터 불러오기
  useEffect(() => {
    handleLoadProducts({ page: 1, pageSize: 4, orderBy: "favorite" });
  }, []);

  // screenType 바뀌면 데이터 다시 불러오기
  useEffect(() => {
    if (screenType === "desktop") {
      handleLoadProducts({ page: 1, pageSize: 4, orderBy: "favorite" });
    } else if (screenType === "tablet") {
      handleLoadProducts({ page: 1, pageSize: 2, orderBy: "favorite" });
    } else if (screenType === "mobile") {
      handleLoadProducts({ page: 1, pageSize: 1, orderBy: "favorite" });
    }
  }, [screenType]);

  return (
    <div className="best-products-list">
      <div className="list-title">베스트 상품</div>
      <div className={`products ${screenType}`}>
        {products.map((item) => {
          const { id, images, name, price, favoriteCount } = item;
          return (
            <ProductCard
              key={id}
              images={images}
              name={name}
              price={price}
              favoriteCount={favoriteCount}
              imgWidth={imageWidth}
            />
          );
        })}
      </div>
    </div>
  );
}
