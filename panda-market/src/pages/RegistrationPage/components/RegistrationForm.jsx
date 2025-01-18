import InputTextarea from "../../../common/InputTextarea";

function RegistrationForm({
  label,
  title,
  children = "내용을 입력해주세요.",
  inputOrTextarea = "input",
  inputClassNames,
  tag,
}) {
  return (
    <form className="flex flex-col w-full items-start gap-[16px]">
      <label
        htmlFor={label}
        className="text-[18px] font-[700] leading-[26px] text-secondary-800"
      >
        {title}
      </label>
      <InputTextarea
        label={label}
        placeholder={children}
        InputOrTextarea={inputOrTextarea}
        classNames={`w-full ${inputClassNames}`}
      />
      {tag}
    </form>
  );
}

export default RegistrationForm;
