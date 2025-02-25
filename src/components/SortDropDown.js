import Image from "next/image";
import sortIcon from "@/assets/images/ic-sort.svg";
import arrowDownIcon from "@/assets/images/ic-arrow-down.svg";

function SortDropDown() {
  return (
    <>
      <button className="flex md:hidden justify-center items-center p-[9px] rounded-[12px] border border-gray-200">
        <Image src={sortIcon} alt="sort" width={24} height={24} />
      </button>
      <button className="hidden md:flex justify-center items-center gap-[24px] w-[130px] h-[42px] rounded-[12px] border border-gray-200">
        최신순
        <Image src={arrowDownIcon} alt="sort" width={24} height={24} />
      </button>
    </>
  );
}

export default SortDropDown;
