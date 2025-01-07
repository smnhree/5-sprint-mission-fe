import "./Product.css";
import heartIc from "../../assets/ic_heart.png";

export function Product({
  images,
  name,
  price,
  favoriteCount,
  styleImgWidth = "28.2rem",
}) {
  const style = {
    img: {
      width: styleImgWidth,
      height: styleImgWidth,
      borderRadius: "1.6rem",
    },
  };

  return (
    <div className="product">
      <img
        style={style.img}
        className="product-img"
        src={images[0]}
        alt={name}
      />
      <span className="product-name">{name}</span>
      <span className="product-price">{price.toLocaleString()}원</span>
      <div className="product-favorite-count-wrap">
        <img className="heart-ic" src={heartIc} alt="좋아요 수" />
        <span className="product-favorite-count">{favoriteCount}</span>
      </div>
    </div>
  );
}
