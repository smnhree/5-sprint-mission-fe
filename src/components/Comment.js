import DropDown from "@/components/DropDown";
import defaultUserImage from "@/assets/images/ic-profile.svg";
import Image from "next/image";
import { formatRelativeTime } from "@/utils/dateFormat";

function Comment({ comment, onDelete }) {
  const imageUrl = comment.userImageUrl || defaultUserImage;

  const handleEditButtonClick = () => {};

  const handleDeleteButtonClick = async () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      onDelete(comment.id);
    }
  };

  return (
    <div className="flex flex-col justify-between items-start gap-[16px] w-full border-b border-[#DFDFDF] bg-[#FCFCFC] p-[25px]">
      <div className="flex items-center gap-[8px] w-full text-[14px] font-[400] text-gray-800">
        <div className="flex-1">{comment.content}</div>
        <DropDown
          onEditClick={handleEditButtonClick}
          onDeleteClick={handleDeleteButtonClick}
        />
      </div>
      <div className="flex items-start gap-[8px]">
        <Image src={imageUrl} alt="user" width={32} height={32} />
        <div className="flex flex-col gap-[4px]">
          <span className="text-[12px] font-[400] text-gray-600">
            {comment.username}
          </span>
          <span className="text-[12px] font-[400] text-gray-400">
            {formatRelativeTime(comment.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Comment;
