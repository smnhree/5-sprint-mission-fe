function InputTextarea({
  InputOrTextarea,
  placeholder,
  classNames,
  label = undefined,
}) {
  return (
    <InputOrTextarea
      placeholder={placeholder}
      className={`${label} rounded-[12px] px-[24px] py-[16px] bg-secondary-100 text-secondary-400 focus:outline-[1px] focus:outline-primary-100 ${classNames}`}
    />
  );
}

export default InputTextarea;
