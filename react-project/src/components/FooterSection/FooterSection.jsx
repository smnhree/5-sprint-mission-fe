import facebookIc from "../../assets/icons/sns/facebook.png";
import twitterIc from "../../assets/icons/sns/twitter.png";
import youtubeIc from "../../assets/icons/sns/youtube.png";
import instagramIc from "../../assets/icons/sns/instagram.png";
import "./FooterSection.css";

// todo: 반응형 웹 적용
export function FooterSection() {
  return (
    <div className="footer">
      <div className="copyright">@codeit - 2024</div>
      <div className="links">
        <a>Privacy Policy</a>
        <a>FAQ</a>
      </div>
      {/* // todo: snsIcons -> components로 분리 고민 */}
      <div className="sns-icons">
        <a href="https://www.facebook.com/?locale=ko_KR" target="_blank">
          <img src={facebookIc} alt="페이스북" />
        </a>
        <a href="https://x.com/?lang=ko" target="_blank">
          <img src={twitterIc} alt="트위터" />
        </a>
        <a href="https://www.youtube.com/" target="_blank">
          <img src={youtubeIc} alt="유튜브" />
        </a>
        <a href="https://www.instagram.com/" target="_blank">
          <img src={instagramIc} alt="인스타그램" />
        </a>
      </div>
    </div>
  );
}
