import heartIc from "../../assets/icons/product_card_heart.png";
import noImgSrcImage from "../../assets/imgs/product_no_img.png";
import "./ProductCard.css";

export function ProductCard({
  images,
  name,
  price,
  favoriteCount,
  imgWidth = "28.2rem",
}) {
  // todo: 스타일(인라인/css/...) 통일하기, 이미지 없거나 잘못된 경로는 기본 이미지 띄우기
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
