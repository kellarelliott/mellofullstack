const $setLogin = $('#login');
const $setSignUp = $('#signup');
const $submitButton = $('#submit');
const $emailInput = $('#email');
const $passwordInput = $('#password');

let authSetting = 'login';

function setAuth(setting) {
  authSetting = setting;

  if (authSetting === 'login') {
    $setLogin.addClass('active');
    $setSignUp.removeClass('active');
    $submitButton.text('Log In');
  } else {
    $setSignUp.addClass('active');
    $setLogin.removeClass('active');
    $submitButton.text('Sign Up');
  }
}

function handleFormSubmit() {
  event.preventDefault();

  let email = $emailInput.val().trim();
  let password = $passwordInput.val().trim();

  if (!email || !password) {
    displayMessage('Email and password fields cannot be blank.', 'danger');
    return;
  }

  console.log(
    `Email: ${email} Password: ${password} AuthSetting: ${authSetting}`
  );
}

const $submitButton = $('#submit');
const $setLogin = $('#login');
const $setSignUp = $('#signup');
const $emailInput = $('#email');
const $passwordInput = $('#password');
const $message = $('#message');
