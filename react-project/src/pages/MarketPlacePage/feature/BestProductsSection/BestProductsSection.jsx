import { Product } from "../ui/Product/Product";
import { productService } from "../../../../apis/ProductService";
import { useEffect, useState } from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";
import classNames from "classnames";
import "./BestProductsSection.css";

export function BestProductsSection() {
  const [products, setProducts] = useState([]);
  const { width } = useWindowSize();
  const [windowState, setWindowState] = useState(
    width < 744 ? "mobile" : width < 1200 ? "tablet" : "desktop"
  );

  const handleLoadProducts = async (options) => {
    const { list } = await productService.getProductList(options);
    setProducts(list);
  };

  useEffect(() => {
    handleLoadProducts({ page: 1, pageSize: 4, orderBy: "favorite" });
  }, []);

  // 반응형 웹
  const productStyleImgWidth = width <= 1199 ? "34.3rem" : "28.2rem";
  const productsClassName = classNames("products", {
    tablet: width < 1199 && width >= 744,
    mobile: width < 744,
  });

  useEffect(() => {
    const currentWindowState =
      width < 744 ? "mobile" : width < 1200 ? "tablet" : "desktop";
    if (currentWindowState !== windowState) {
      setWindowState(() => currentWindowState);
      const options =
        currentWindowState === "desktop"
          ? { page: 1, pageSize: 4, orderBy: "favorite" }
          : currentWindowState === "tablet"
          ? { page: 1, pageSize: 2, orderBy: "favorite" }
          : { page: 1, pageSize: 1, orderBy: "favorite" };
      handleLoadProducts(options);
    }
  }, [width, windowState]);

  return (
    <div className="best-products-section">
      <div className="section-title">베스트 상품</div>
      <div className={productsClassName}>
        {products.map((item) => {
          const { id, images, name, price, favoriteCount } = item;
          return (
            <Product
              key={id}
              images={images}
              name={name}
              price={price}
              favoriteCount={favoriteCount}
              styleImgWidth={productStyleImgWidth}
            />
          );
        })}
      </div>
    </div>
  );
}
