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
  return signupInputFields.email.pattern.test(signupInputFields.email.input.value) && signupInputFields.email.input.value.length >= 8;
}

function changeStatusLoginBtn() {
  if (isLoginValid()) {
    loginBtnStatus.valid();
  } else {
    loginBtnStatus.invalid();
  }
}

signupInputFields.email.input.addEventListener("input", changeStatusLoginBtn);
signupInputFields.password.input.addEventListener("input", changeStatusLoginBtn);