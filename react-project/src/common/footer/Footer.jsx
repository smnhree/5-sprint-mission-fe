import { FooterSnsIcons } from "./ui/FooterSnsIcons/FooterSnsIcons";
import "./Footer.css";
import { FooterCopyright } from "./ui/FooterCopyright";
import { FooterLinks } from "./ui/FooterLinks/FooterLinks";

// todo: className이 컴포넌트 안에서 확인 가능.. 스타일을 어디서 먹여야할까
export function Footer() {
  return (
    <div className="footer">
      <FooterCopyright year="2024" />
      <FooterLinks />
      <FooterSnsIcons />
    </div>
  );
}
