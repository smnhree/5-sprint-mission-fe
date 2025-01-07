import { Product } from "../ui/Product/Product";
import { productService } from "../../../../apis/ProductService";
import { useEffect, useState } from "react";
import "./BestProductsSection.css";

export function BestProductsSection() {
  const [products, setProducts] = useState([]);

  const handleLoadProducts = async (options) => {
    const { list } = await productService.getProductList(options);
    setProducts(list);
  };

  useEffect(() => {
    handleLoadProducts({ page: 1, pageSize: 4, orderBy: "favorite" });
  }, []);

  return (
    <div className="best-products-section">
      <div className="section-title">베스트 상품</div>
      <div className="products">
        {products.map((item) => {
          const { id, images, name, price, favoriteCount } = item;
          return (
            <Product
              key={id}
              images={images}
              name={name}
              price={price}
              favoriteCount={favoriteCount}
              styleImgWidth="28.2rem"
            />
          );
        })}
      </div>
    </div>
  );
}
