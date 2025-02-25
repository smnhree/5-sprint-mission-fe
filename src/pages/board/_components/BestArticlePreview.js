import Image from "next/image";
import LabeledBox from "@/components/LabeledBox";
import medalImage from "@/assets/images/ic-medal.svg";
import defaultImage from "@/assets/images/laptop.svg";
import heartIcon from "@/assets/images/ic-heart.svg";
import { formatDate } from "@/utils/dateFormat";

function BestArticlePreview({ article }) {
  const imageUrl = article.imageUrl || defaultImage;

  return (
    <LabeledBox
      labelImage={<Image src={medalImage} alt="best" width={16} height={16} />}
      labelText="BEST"
    >
      <div className="flex flex-col gap-[40px] justify-between">
        <div className="flex justify-between items-start gap-[37px] mt-[16px]">
          <p className="text-[18px] md:text-[20px] font-[600] text-gray-800">
            {article.title}
          </p>
          <div className="w-[72px] min-width-[72px] h-[72px] relative flex-shrink-0">
            <Image src={imageUrl} alt="laptop" fill={true} />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-[8px] text-gray-600 text-[14px] font-[400]">
            <span>{article.username}</span>
            <div className="flex items-center gap-[4px]">
              <Image src={heartIcon} alt="heart" width={16} height={16} />
              <span className="text-[14px] font-[400] text-gray-500">
                {article.likeCount >= 10000 ? "9999+" : article.likeCount}
              </span>
            </div>
          </div>
          <span className="text-[14px] font-[400] text-gray-400">
            {formatDate(article.createdAt)}
          </span>
        </div>
      </div>
    </LabeledBox>
  );
}

export default BestArticlePreview;
