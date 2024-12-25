import USER_DATA from "../data/userData.js";

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
    pattern: {
      test: () => true  // 항상 pattern 테스트 통과(=제한없다는 의미)
    }
  },
  password: {
    input: document.querySelector("#input-password"),
    status: "",
    messages: {
      blank: document.querySelector(".blank-psw-msg"),
      invalid: document.querySelector(".invalid-psw-msg"),
    },
    pattern: /^.{8,}$/, // 비밀번호는 8자 이상
    visibility: "off"
  },
  passwordCheck: {
    input: document.querySelector("#input-password-check"),
    status: "",
    message: {
      invalid: document.querySelector(".not-match-psw-msg")
    },
    pattern: {
      test: (value) => value === signupInputFields.password.input.value, // 흠...
    },
    visibility: "off"
  },
};

// 상태 설정
function setFieldStatus(fieldName, inputContent) {
  if (!inputContent) {
    signupInputFields[fieldName].status = "blank";
  }
  else if (!signupInputFields[fieldName].pattern.test(inputContent)) {
    signupInputFields[fieldName].status = "invalid";
  }
  else {
    signupInputFields[fieldName].status = "valid";
  }
}

function getFieldStatus(fieldName) {
  return signupInputFields[fieldName].status
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
  blank: {
    class: "error",
    show: signupInputFields.passwordCheck.message.invalid
  },
  invalid: {
    class: "error",
    show: signupInputFields.passwordCheck.message.invalid
  },
  valid: {
    removeClass: "error",
    hide: signupInputFields.passwordCheck.message.invalid
  },
}

function getConfigByFieldName(fieldName) {
  if (fieldName === "email") {
    return emailStatusConfig;
  } else if (fieldName === "nickname") {
    return nicknameStatusConfig;
  } else if (fieldName === "password") {
    return passwordStatusConfig;
  } else if (fieldName === "passwordCheck") {
    return passwordCheckStatusConfig;
  }
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
function updateFieldByEvent(fieldName, e) {
  const inputContent = e.target.value;
  setFieldStatus(fieldName, inputContent);
}

// 메인 함수 - 스타일 업데이트
function updateFieldStyleByEvent(fieldName, e) {
  setFieldStatus(fieldName, e.target.value);
  const status = getFieldStatus(fieldName);
  const config = getConfigByFieldName(fieldName);
  applyStatus(config[status], e);
}

// 이벤트 리스너
// 상태 업데이트
signupInputFields.email.input.addEventListener("input", (e) => updateFieldByEvent("email", e));
signupInputFields.nickname.input.addEventListener("input", (e) => updateFieldByEvent("nickname", e));
signupInputFields.password.input.addEventListener("input", (e) => updateFieldByEvent("password", e));
signupInputFields.passwordCheck.input.addEventListener("input", (e) => updateFieldByEvent("passwordCheck", e));
// 스타일 업데이트
signupInputFields.email.input.addEventListener("blur", (e) => updateFieldStyleByEvent("email", e));
signupInputFields.nickname.input.addEventListener("blur", (e) => updateFieldStyleByEvent("nickname", e));
signupInputFields.password.input.addEventListener("blur", (e) => updateFieldStyleByEvent("password", e));
signupInputFields.passwordCheck.input.addEventListener("blur", (e) => updateFieldStyleByEvent("passwordCheck", e));

// signupBtn
const signupBtn = {
  element: document.querySelector("#signup-btn"),
  status: "invalid",
}

function setSignupBtnStatus() {
  const emailValid = signupInputFields.email.status === "valid";
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
}

function changeSignupBtnStatus() {
  setSignupBtnStatus();
  applySignupBtnStatus(signupBtnStatusConfig[signupBtn.status]);
}

signupInputFields.email.input.addEventListener("input", changeSignupBtnStatus);
signupInputFields.nickname.input.addEventListener("input", changeSignupBtnStatus);
signupInputFields.password.input.addEventListener("input", changeSignupBtnStatus);
signupInputFields.passwordCheck.input.addEventListener("input", changeSignupBtnStatus);

// 모달
// 회원가입 가능 여부 판단
function isSignupValid() {
  const emailValue = signupInputFields.email.input.value;
  for (data of USER_DATA) {
    if(data["email"] === emailValue) {
      return false;
    }
  }
  return true;
}

// 회원가입 버튼 -> 모달 띄우기, 링크 이동
const signupModal = {
  modal: document.querySelector(".modal"),
  modalCloseBtn: document.querySelector(".modal-close-btn")
}

function clickSignupBtn(e) {
  if (signupBtn.status === "valid") {
    const signupValid = isSignupValid();
    if (!signupValid) { // valid -> 이미 있는 아이디인지 확인 -> 링크 이동 x & 모달 띄우기
      signupModal.modal.classList.remove("hidden");
    } else if (signupValid) { // 링크 이동
      window.location.href = "../index.html"
    }
  }
  // invalid -> 링크 이동 x
}

function closeModal(e) {
  const btnElement = e.target;
  const modalElement = btnElement.closest(".modal");
  modalElement.classList.add("hidden");
}

signupBtn.element.addEventListener("click", clickSignupBtn);
signupModal.modalCloseBtn.addEventListener("click", closeModal);

// 비밀번호 표시/숨기기 토글
const passwordVisibilityIcon = {
  password: {
    element: document.querySelector(".password-field .visibility-icon"),
    img: document.querySelector(".password-field #visibility-icon > img")
  },
  passwordCheck: {
    element: document.querySelector(".passwordCheck-field .visibility-icon"),
    img: document.querySelector(".passwordCheck-field #visibility-icon > img")
  }
}

function passwordVisivilityToggle(fieldName, e) {
  if (signupInputFields[fieldName].visibility === "off") {
    passwordVisibilityIcon[fieldName].img.src = "../img/btn_visibility_on.png";
    signupInputFields[fieldName].input.type = "text";
    signupInputFields[fieldName].visibility = "on";
  } else if (signupInputFields[fieldName].visibility === "on") {
    passwordVisibilityIcon[fieldName].img.src = "../img/btn_visibility_off.png";
    signupInputFields[fieldName].input.type = "password";
    signupInputFields[fieldName].visibility = "off";
  }
}

passwordVisibilityIcon.password.element.addEventListener("click", (e) => passwordVisivilityToggle("password", e));
passwordVisibilityIcon.passwordCheck.element.addEventListener("click", (e) => passwordVisivilityToggle("passwordCheck", e));