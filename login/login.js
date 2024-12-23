// import { USER_DATA } from "../data/userData"; CORS 오류 뜸

const loginInputFields = {
  email: {
    input: document.querySelector("#input-email"),
    status: "",
    messages: {
      blank: document.querySelector(".blank-email-msg"),
      invalid: document.querySelector(".invalid-email-msg"),
    },
    pattern: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+$/ // 이메일 패턴
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
  }
};

// 상태 설정
function setFieldStatus(fieldName, inputContent) {
  if (!inputContent) {
    loginInputFields[fieldName].status = "blank";
  }
  else if (!loginInputFields[fieldName].pattern.test(inputContent)) {
    loginInputFields[fieldName].status = "invalid";
  }
  else {
    loginInputFields[fieldName].status = "valid";
  }
}

function getFieldStatus(fieldName) {
  return loginInputFields[fieldName].status
}

// 상태에 대한 스타일 정의
const emailStatusConfig = {
  blank: {
    class: "error",
    hide: loginInputFields.email.messages.invalid,
    show: loginInputFields.email.messages.blank
  },
  invalid: {
    class: "error",
    hide: loginInputFields.email.messages.blank,
    show: loginInputFields.email.messages.invalid
  },
  valid: {
    removeClass: "error",
    hide: [
      loginInputFields.email.messages.blank,
      loginInputFields.email.messages.invalid
    ]
  },
};

const passwordStatusConfig = {
  blank: {
    class: "error",
    hide: loginInputFields.password.messages.invalid,
    show: loginInputFields.password.messages.blank
  },
  invalid: {
    class: "error",
    hide: loginInputFields.password.messages.blank,
    show: loginInputFields.password.messages.invalid
  },
  valid: {
    removeClass: "error",
    hide: [
      loginInputFields.password.messages.blank,
      loginInputFields.password.messages.invalid
    ]
  },
}

function getConfigByFieldName(fieldName) {
  if (fieldName === "email") {
    return emailStatusConfig;
  } else if (fieldName === "password") {
    return passwordStatusConfig;
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
loginInputFields.email.input.addEventListener("input", (e) => updateFieldByEvent("email", e));
loginInputFields.password.input.addEventListener("input", (e) => updateFieldByEvent("password", e));
// 스타일 업데이트
loginInputFields.email.input.addEventListener("blur", (e) => updateFieldStyleByEvent("email", e));
loginInputFields.password.input.addEventListener("blur", (e) => updateFieldStyleByEvent("password", e));

// loginBtn
const loginBtn = {
  element: document.querySelector("#login-btn"),
  status: "invalid",
}

loginBtn.element.disabled = true;

function setloginBtnStatus() {
  const emailValid = loginInputFields.email.status === "valid";
  const passwordValid = loginInputFields.password.status === "valid";
  if (emailValid && passwordValid) {
    loginBtn.status = "valid"
  } else {
    loginBtn.status = "invalid"
  }
}

const loginBtnStatusConfig = {
  valid: {
    class: "valid",
    disable: false
  },
  invalid: {
    removeClass: "valid",
    disable: true
  }
}

function applyloginBtnStatus(config) {
  if (config.class) loginBtn.element.classList.add(config.class);
  if (config.removeClass) loginBtn.element.classList.remove(config.removeClass);
  if (!config.disabled) loginBtn.element.disabled = false;
}

function changeloginBtnStatus() {
  setloginBtnStatus();
  applyloginBtnStatus(loginBtnStatusConfig[loginBtn.status]);
}

loginInputFields.email.input.addEventListener("input", changeloginBtnStatus);
loginInputFields.password.input.addEventListener("input", changeloginBtnStatus);

// alert 메시지
const USER_DATA = [
  {email: 'codeit1@codeit.com', password: "codeit101!"},
  {email: 'codeit2@codeit.com', password: "codeit202!"},
  {email: 'codeit3@codeit.com', password: "codeit303!"},
  {email: 'codeit4@codeit.com', password: "codeit404!"},
  {email: 'codeit5@codeit.com', password: "codeit505!"},
  {email: 'codeit6@codeit.com', password: "codeit606!"}
]

// 로그인 가능 여부 판단
function isLoginValid() {
  const emailValue = loginInputFields.email.input.value;
  const passwordValue = loginInputFields.password.input.value;
  for (data of USER_DATA) {
    if((data["email"] === emailValue) && (data["password"] === passwordValue)) {
      return true;
    }
  }
  return false;
}

// 메인 함수 - 로그인 가능 여부에 따라 모달 띄우기
const loginModal = {
  modal: document.querySelector(".modal"),
  modalCloseBtn: document.querySelector(".modal-close-btn")
}

function showLoginErrorModal(e) {
  const isValid = isLoginValid();
  if (!isValid) {
    e.preventDefault();
    loginModal.modal.classList.remove("hidden");
  }
}

function closeModal(e) {
  const btnElement = e.target;
  const modalElement = btnElement.closest(".modal");
  modalElement.classList.add("hidden");
}

loginBtn.element.addEventListener("click", showLoginErrorModal);
loginModal.modalCloseBtn.addEventListener("click", closeModal);

// 비밀번호 표시/숨기기 토글
const passwordVisibilityIcon = {
  element: document.querySelector("#visibility-icon"),
  img: document.querySelector("#visibility-icon > img")
}

function passwordVisivilityToggle() {
  if (loginInputFields.password.visibility === "off") {
    console.log("작동되나요");
    passwordVisibilityIcon.img.src = "../img/btn_visibility_on.png";
    loginInputFields.password.input.type = "text";
    loginInputFields.password.visibility = "on";
  } else if (loginInputFields.password.visibility === "on") {
    passwordVisibilityIcon.img.src = "../img/btn_visibility_off.png";
    loginInputFields.password.input.type = "password";
    loginInputFields.password.visibility = "off";
  }
}

passwordVisibilityIcon.element.addEventListener("click", passwordVisivilityToggle);