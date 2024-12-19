
/*
1. 추상화 필요
2. 회원가입 - psw와 pwsCheck 간 확인에서 psw input 내용도 변경할 때 pswCheck 메시지 조절 기능
*/

const emailInput = document.querySelector("#input-email");
const nicknameInput = document.querySelector("#input-nickname");
const passwordInput = document.querySelector("#input-password");
const passwordCheckInput = document.querySelector("#input-password-check");

const blankEmailMessage = document.querySelector(".blank-email-msg");
const blankNicknameMessage = document.querySelector(".blank-nickname-msg")
const blankPswMessage = document.querySelector(".blank-psw-msg");

const invalidEmailMessage = document.querySelector(".invalid-email-msg");
const invalidPswMessage = document.querySelector(".invalid-psw-msg");

const passwordCheckMessage = document.querySelector(".psw-check-msg");

const loginBtn = document.querySelector("#login-btn");

const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

function emailInputError(e) {
  const inputContent = e.target.value;
  if (inputContent === "") {
    e.target.classList.add("error");
    blankEmailMessage.classList.remove("hidden");
    invalidEmailMessage.classList.add("hidden");
  } else {
    if (!emailPattern.test(inputContent)) {
      e.target.classList.add("error");
      blankEmailMessage.classList.add("hidden");
      invalidEmailMessage.classList.remove("hidden");
    } else {
      e.target.classList.remove("error");
      blankEmailMessage.classList.add("hidden");
      invalidEmailMessage.classList.add("hidden");
    }
  }
}

function nicknameInputError(e) {
  const inputContent = e.target.value;
  if (inputContent === "") {
    e.target.classList.add("error");
    blankNicknameMessage.classList.remove("hidden");
  } else {
    e.target.classList.remove("error");
    blankNicknameMessage.classList.add("hidden");
  }
}

function passwordInputError(e) {
  const inputContent = e.target.value;
  if (inputContent === "") {
    e.target.classList.add("error");
    blankPswMessage.classList.remove("hidden");
    invalidPswMessage.classList.add("hidden");
  } else {
    if (inputContent.length < 8) {
      e.target.classList.add("error");
      blankPswMessage.classList.add("hidden");
      invalidPswMessage.classList.remove("hidden");
    } else {
      e.target.classList.remove("error");
      blankPswMessage.classList.add("hidden");
      invalidPswMessage.classList.add("hidden");
    }
  }
}

function changeStatusLoginBtn() {
  if (emailPattern.test(emailInput.value) && passwordInput.value.length >= 8) {
    loginBtn.classList.add("vaild");
    loginBtn.disabled = false;
  } else {
    loginBtn.classList.remove("vaild");
    loginBtn.disabled = true;
  }
}

function passwordCheckInputError(e) {
  const inputContent = e.target.value;
  if (inputContent !== passwordInput.value) {
    e.target.classList.add("error");
    passwordCheckMessage.classList.remove("hidden");
  } else {
    e.target.classList.remove("error");
    passwordCheckMessage.classList.add("hidden");
  }
}


emailInput.addEventListener("blur", emailInputError);
passwordInput.addEventListener("blur", passwordInputError);
nicknameInput.addEventListener("blur", nicknameInputError);
emailInput.addEventListener("input", changeStatusLoginBtn);
passwordInput.addEventListener("input", changeStatusLoginBtn);
passwordCheckInput.addEventListener("input", passwordCheckInputError);

