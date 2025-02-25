function Textarea({ label, placeholder, size }) {
  return (
    <div className="flex flex-col gap-[12px]">
      <label htmlFor={label} className="text-[14px] font-[700] text-gray-800">
        {label}
      </label>
      <textarea
        id={label}
        placeholder={placeholder}
        className={`w-full ${
          size === "large" ? "h-[200px]" : "h-[109px]"
        } bg-gray-100 rounded-[12px] px-[24px] py-[12px] placeholder:gray-400`}
      />
    </div>
  );
}

export default Textarea;
