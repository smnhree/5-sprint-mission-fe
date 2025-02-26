import searchIcon from "@/assets/images/ic-search.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function SearchInput({ placeholder }) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(router.query.keyword || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      const queryParams = new URLSearchParams(router.query);

      if (inputValue.trim()) {
        queryParams.set("keyword", inputValue);
      } else {
        queryParams.delete("keyword");
      }

      router.push({
        pathname: router.pathname,
        query: Object.fromEntries(queryParams.entries()),
      });
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue]);

  return (
    <div className="flex items-center bg-[#F3F4F6] rounded-[12px] pl-[16px] pr-[20px] h-[42px] flex-grow">
      <Image src={searchIcon} alt="search" width={24} height={24} />
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full h-[48px] outline-none bg-transparent border-none px-[16px] py-[12px] placeholder:gray-200"
      />
    </div>
  );
}

export default SearchInput;
