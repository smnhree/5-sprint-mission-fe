import heartIc from "../../assets/icons/product_card_heart.png";
import "./ProductCard.css";

export function ProductCard({
  images,
  name,
  price,
  favoriteCount,
  imgWidth = "28.2rem",
}) {
  const style = {
    a: {
      width: imgWidth,
      height: imgWidth,
      borderRadius: "1.6rem",
    },
    img: {
      width: "100%",
      height: "100%",
      borderRadius: "1.6rem",
    },
  };

  return (
    <div className="product">
      <a style={style.a}>
        <img
          style={style.img}
          className="product-img"
          src={images[0]}
          alt={name}
        />
      </a>
      <div className="product-info">
        <span className="product-name">{name}</span>
        <span className="product-price">{price.toLocaleString()}원</span>
        <div className="product-favorite-count-wrap">
          <button className="heart-btn">
            <img src={heartIc} alt="좋아요 수" />
          </button>
          <span className="product-favorite-count">{favoriteCount}</span>
        </div>
      </div>
    </div>
  );
}
