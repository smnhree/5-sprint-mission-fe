// input, message, pattern
const loginSignupInputFields = {
  email: {
    input: document.querySelector("#input-email"),
    messages: {
      blank: document.querySelector(".blank-email-msg"),
      invalid: document.querySelector(".invalid-email-msg"),
    },
    pattern: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+$/, // 이메일 패턴
  },
  nickname: {
    input: document.querySelector("#input-nickname"),
    message: {
      blank: document.querySelector(".blank-nickname-msg")
    }
  },
  password: {
    input: document.querySelector("#input-password"),
    messages: {
      blank: document.querySelector(".blank-psw-msg"),
      invalid: document.querySelector(".invalid-psw-msg"),
    },
    pattern: /^.{8,}$/, // 비밀번호는 8자 이상
  },
  passwordCheck: {
    input: document.querySelector("#input-password-check"),
    message: {
      invalid: document.querySelector(".not-match-psw-msg")
    },
    pattern: (value) => value === loginSignupInputFields.password.input.value // 흠...
  },
};

const loginSignupBtnFields = {
  login: {
    button: document.querySelector("#login-btn"),
  },
  signup: {
    button: document.querySelector("#signup-btn")
  }
}

// 상태가 바뀌는 조건
function getEmailStatus(inputContent) {
  if (inputContent === "") return "blank";
  if (!loginSignupInputFields.email.pattern.test(inputContent)) return "invalid";
  return "valid";
}

function getNicknameStatus(inputContent) {
  if (inputContent === "") return "blank";
  return "valid";
}

function getPasswordStatus(inputContent) {
  if (inputContent === "") return "blank";
  if (!loginSignupInputFields.password.pattern.test(inputContent)) return "invalid";
  return "valid";
}

function getPasswordCheckStatus(inputContent) {
  if (!loginSignupInputFields.passwordCheck.pattern(inputContent)) return "invalid";  // 흠...
  return "valid";
}

// function getLoginBtnStatus() {
//   if ()
// }

// function getSignupBtnStatus() {

// }

// 상태 정의
const emailStatusConfig = {
  blank: {
    class: "error",
    hide: loginSignupInputFields.email.messages.invalid,
    show: loginSignupInputFields.email.messages.blank
  },
  invalid: {
    class: "error",
    hide: loginSignupInputFields.email.messages.blank,
    show: loginSignupInputFields.email.messages.invalid
  },
  valid: {
    removeClass: "error",
    hide: [
      loginSignupInputFields.email.messages.blank,
      loginSignupInputFields.email.messages.invalid
    ]
  },
};

const nicknameStatusConfig = {
  blank: {
    class: "error",
    show: loginSignupInputFields.nickname.message.blank
  },
  valid: {
    removeClass: "error",
    hide: loginSignupInputFields.nickname.message.blank
  }
}

const passwordStatusConfig = {
  blank: {
    class: "error",
    hide: loginSignupInputFields.password.messages.invalid,
    show: loginSignupInputFields.password.messages.blank
  },
  invalid: {
    class: "error",
    hide: loginSignupInputFields.password.messages.blank,
    show: loginSignupInputFields.password.messages.invalid
  },
  valid: {
    removeClass: "error",
    hide: [
      loginSignupInputFields.password.messages.blank,
      loginSignupInputFields.password.messages.invalid
    ]
  },
}

const passwordCheckStatusConfig = {
  invalid: {
    class: "error",
    show: loginSignupInputFields.passwordCheck.message.invalid
  },
  valid: {
    removeClass: "error",
    hide: loginSignupInputFields.passwordCheck.message.invalid
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

// 메인 함수
function emailInputErrors(e) {
  const inputContent = e.target.value;
  const status = getEmailStatus(inputContent);  // 상태
  applyStatus(emailStatusConfig[status], e);  // 동작(classList 조작 -> style 변경)
}

function nicknameInputErrors(e) {
  const inputContent = e.target.value;
  const status = getNicknameStatus(inputContent);
  console.log(nicknameStatusConfig[status]);
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
loginSignupInputFields.email.input.addEventListener("blur", emailInputErrors);
// loginSignupInputFields.nickname.input.addEventListener("blur", nicknameInputErrors);
loginSignupInputFields.password.input.addEventListener("blur", passwordInputErrors);
// loginSignupInputFields.passwordCheck.input.addEventListener("blur", passwordCheckInputErrors);

// loginBtn
// 상태 변화
const loginBtn = document.querySelector("#login-btn");
const loginBtnStatus = {
  valid: function () {
    loginBtn.classList.add("vaild");
    loginBtn.disabled = false;
  },
  invalid: function () {
    loginBtn.classList.remove("vaild");
    loginBtn.disabled = true;
  }
}
function isLoginValid() {
  return loginSignupInputFields.email.pattern.test(loginSignupInputFields.email.input.value) && loginSignupInputFields.email.input.value.length >= 8;
}

function changeStatusLoginBtn() {
  if (isLoginValid()) {
    loginBtnStatus.valid();
  } else {
    loginBtnStatus.invalid();
  }
}

loginSignupInputFields.email.input.addEventListener("input", changeStatusLoginBtn);
loginSignupInputFields.password.input.addEventListener("input", changeStatusLoginBtn);