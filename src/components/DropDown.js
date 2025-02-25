import Image from "next/image";
import iconDropDown from "@/assets/images/ic-kebab.svg";

function DropDown() {
  return (
    <>
      <button>
        <Image src={iconDropDown} alt="dropDown" width={24} height={24} />
      </button>
    </>
  );
}

export default DropDown;
