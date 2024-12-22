// input, message, pattern
const signupInputFields = {
  email: {
    input: document.querySelector("#input-email"),
    status: "",
    messages: {
      blank: document.querySelector(".blank-email-msg"),
      invalid: document.querySelector(".invalid-email-msg"),
    },
    pattern: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+$/ // 이메일 패턴
  },
  nickname: {
    input: document.querySelector("#input-nickname"),
    status: "",
    message: {
      blank: document.querySelector(".blank-nickname-msg")
    },
  },
  password: {
    input: document.querySelector("#input-password"),
    status: "",
    messages: {
      blank: document.querySelector(".blank-psw-msg"),
      invalid: document.querySelector(".invalid-psw-msg"),
    },
    pattern: /^.{8,}$/, // 비밀번호는 8자 이상
  },
  passwordCheck: {
    input: document.querySelector("#input-password-check"),
    status: "",
    message: {
      invalid: document.querySelector(".not-match-psw-msg")
    },
    pattern: (value) => value === signupInputFields.password.input.value, // 흠...
  },
};

// 상태가 바뀌는 조건
function getEmailStatus(inputContent) {
  if (!inputContent) {
    signupInputFields.email.status = "blank";
    return "blank";
  }
  if (!signupInputFields.email.pattern.test(inputContent)) {
    signupInputFields.email.status = "invalid";
    return "invalid";
  }
  signupInputFields.email.status = "valid";
  return "valid";
}

function getNicknameStatus(inputContent) {
  if (!inputContent) {
    signupInputFields.nickname.status = "blank";
    return "blank";
  }
  signupInputFields.nickname.status = "valid";
  return "valid";
}

function getPasswordStatus(inputContent) {
  if (!inputContent) {
    signupInputFields.password.status = "blank";
    return "blank";
  }
  if (!signupInputFields.password.pattern.test(inputContent)) {
    signupInputFields.password.status = "invalid";
    return "invalid";
  }
  signupInputFields.password.status = "valid";
  return "valid";
}

function getPasswordCheckStatus(inputContent) {
  if (!signupInputFields.passwordCheck.pattern(inputContent)) {
    signupInputFields.passwordCheck.status = "invalid";
    return "invalid";  // 흠...
  }
  signupInputFields.passwordCheck.status = "valid";
  return "valid";
}


// 상태에 대한 스타일 정의
const emailStatusConfig = {
  blank: {
    class: "error",
    hide: signupInputFields.email.messages.invalid,
    show: signupInputFields.email.messages.blank
  },
  invalid: {
    class: "error",
    hide: signupInputFields.email.messages.blank,
    show: signupInputFields.email.messages.invalid
  },
  valid: {
    removeClass: "error",
    hide: [
      signupInputFields.email.messages.blank,
      signupInputFields.email.messages.invalid
    ]
  },
};

const nicknameStatusConfig = {
  blank: {
    class: "error",
    show: signupInputFields.nickname.message.blank
  },
  valid: {
    removeClass: "error",
    hide: signupInputFields.nickname.message.blank
  }
}

const passwordStatusConfig = {
  blank: {
    class: "error",
    hide: signupInputFields.password.messages.invalid,
    show: signupInputFields.password.messages.blank
  },
  invalid: {
    class: "error",
    hide: signupInputFields.password.messages.blank,
    show: signupInputFields.password.messages.invalid
  },
  valid: {
    removeClass: "error",
    hide: [
      signupInputFields.password.messages.blank,
      signupInputFields.password.messages.invalid
    ]
  },
}

const passwordCheckStatusConfig = {
  invalid: {
    class: "error",
    show: signupInputFields.passwordCheck.message.invalid
  },
  valid: {
    removeClass: "error",
    hide: signupInputFields.passwordCheck.message.invalid
  },
}

// class 업데이트 -> 스타일 변경 함수
function applyStatus(config, e) {
  if (config.class) e.target.classList.add(config.class);
  if (config.removeClass) e.target.classList.remove(config.removeClass);
  if (config.show) config.show.classList.remove("hidden");
  if (config.hide) {
    (Array.isArray(config.hide) ? config.hide : [config.hide]).forEach(el => el.classList.add("hidden"));
  }
}
// 메인 함수 - 상태 업데이트
function updateEmailInputStatus(e) {
  const inputContent = e.target.value;
  getEmailStatus(inputContent);
}

function updateNicknameInputStatus(e) {
  const inputContent = e.target.value;
  getNicknameStatus(inputContent);
}

function updatePasswordInputStatus(e) {
  const inputContent = e.target.value;
  getPasswordStatus(inputContent);
}

function updatePasswordCheckInputStatus(e) {
  const inputContent = e.target.value;
  getPasswordCheckStatus(inputContent);
}


// 메인 함수 - 에러 스타일 업데이트
function emailInputErrors(e) {
  const inputContent = e.target.value;
  const status = getEmailStatus(inputContent);  // 상태
  applyStatus(emailStatusConfig[status], e);  // 동작(classList 조작 -> style 변경)
}

function nicknameInputErrors(e) {
  const inputContent = e.target.value;
  const status = getNicknameStatus(inputContent);
  applyStatus(nicknameStatusConfig[status], e);
}

function passwordInputErrors(e) {
  const inputContent = e.target.value;
  const status = getPasswordStatus(inputContent);
  applyStatus(passwordStatusConfig[status], e);
}

function passwordCheckInputErrors(e) {
  const inputContent = e.target.value;
  const status = getPasswordCheckStatus(inputContent);
  applyStatus(passwordCheckStatusConfig[status], e);
}

// 이벤트 리스너
signupInputFields.email.input.addEventListener("input", updateEmailInputStatus);
signupInputFields.nickname.input.addEventListener("input", updateNicknameInputStatus);
signupInputFields.password.input.addEventListener("input", updatePasswordInputStatus);
signupInputFields.passwordCheck.input.addEventListener("input", updatePasswordCheckInputStatus);

signupInputFields.email.input.addEventListener("blur", emailInputErrors);
signupInputFields.nickname.input.addEventListener("blur", nicknameInputErrors);
signupInputFields.password.input.addEventListener("blur", passwordInputErrors);
signupInputFields.passwordCheck.input.addEventListener("blur", passwordCheckInputErrors);

// signupBtn
const signupBtn = {
  element: document.querySelector("#signup-btn"),
  status: "invalid",
}

signupBtn.element.disabled = true;

function getSignupBtnStatus() {
  const emailValid = signupInputFields.email.status === "valid";
  console.log("email:", emailValid);
  const nicknameValid = signupInputFields.nickname.status === "valid";
  const passwordValid = signupInputFields.password.status === "valid";
  const passwordCheckValid = signupInputFields.passwordCheck.status === "valid";
  if (emailValid && nicknameValid && passwordValid && passwordCheckValid) {
    signupBtn.status = "valid"
  } else {
    signupBtn.status = "invalid"
  }
}

const signupBtnStatusConfig = {
  valid: {
    class: "valid",
    disable: false
  },
  invalid: {
    removeClass: "valid",
    disable: true
  }
}

function applySignupBtnStatus(config) {
  if (config.class) signupBtn.element.classList.add(config.class);
  if (config.removeClass) signupBtn.element.classList.remove(config.removeClass);
  if (!config.disabled) signupBtn.element.disabled = false;
}

function changeSignupBtnStatus() {
  const btnStatus = getSignupBtnStatus();
  applySignupBtnStatus(signupBtnStatusConfig[signupBtn.status]);
}

signupInputFields.email.input.addEventListener("input", changeSignupBtnStatus);
signupInputFields.nickname.input.addEventListener("input", changeSignupBtnStatus);
signupInputFields.password.input.addEventListener("input", changeSignupBtnStatus);
signupInputFields.passwordCheck.input.addEventListener("input", changeSignupBtnStatus);