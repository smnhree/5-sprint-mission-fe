import facebookIc from "../../assets/ic_facebook_footer.png";
import twitterIc from "../../assets/ic_twitter_footer.png";
import youtubeIc from "../../assets/ic_youtube_footer.png";
import instagramIc from "../../assets/ic_instagram_footer.png";
import "./FooterSnsIcons.css";

export function FooterSnsIcons() {
  return (
    <div className="footer-sns-icons">
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
  );
}
