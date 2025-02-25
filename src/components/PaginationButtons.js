import Link from "next/link";

function PaginationButtons({ pageCount, pageLimit }) {
  return (
    <div className="flex justify-center items-center gap-[16px] text-[20px]">
      {Array.from({ length: pageCount }).map((_, index) => (
        <Link
          href={`/board?offset=${index * pageLimit}&limit=${pageLimit}`}
          key={index}
        >
          <button className="w-[40px] h-[40px] rounded-full border border-gray-200">
            {index + 1}
          </button>
        </Link>
      ))}
    </div>
  );
}

export default PaginationButtons;
