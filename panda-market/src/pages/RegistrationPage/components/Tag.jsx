import xIcon from "../../../assets/icon/ic_X.png";

function Tag({ children }) {
  return (
    <div className="flex px-[16px] py-[6px] gap-[10px] rounded-[26px] bg-secondary-100 ">
      <span className="text-[16px] font-[400] leading-[26px] text-secondary-800">
        {children}
      </span>
      <img src={xIcon} alt="취소" className="w-[22px] h-[24px]" />
    </div>
  );
}

export default Tag;
