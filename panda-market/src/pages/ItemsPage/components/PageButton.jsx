function PageButton({ content, isActive = false }) {
  const backgroundColor = isActive ? "bg-primary-100" : "bg-white";
  return (
    <button
      className={`w-[40px] h-[40px] rounded-[40px] border-[1px] border-secondary-200 text-secondary-500 ${backgroundColor}`}
    >
      {content}
    </button>
  );
}

export default PageButton;
