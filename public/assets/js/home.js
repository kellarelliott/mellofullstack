const $submitButton = $('#submit');
const $setLogin = $('#login');
const $setSignUp = $('#signup');
const $emailInput = $('#email');
const $passwordInput = $('#password');
const $message = $('#message');

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

  $emailInput.val('');
  $passwordInput.val('');

  authenticateUser(email, password);
}

function displayMessage(message, type) {
  $message.text(message).attr('class', type);
}

function handleSignupResponse(status) {
  if (status === 'success') {
    displayMessage('Registered successfully! You may now sign in.', 'success');
  } else {
    displayMessage(
      'Something went wrong. A user with this account may already exist.',
      'danger'
    );
  }
}

function authenticateUser(email, password) {
  $.ajax({
    url: '/' + authSetting,
    data: {
      user: {
        email,
        password
      }
    },
    method: 'POST'
  })
    .then(function (data, status) {
      if (authSetting === 'signup') {
        handleSignupResponse(status);
      }
    })
    .catch(function (err) {
      if (authSetting === 'signup') {
        handleSignupResponse(err.statusText);
      }
    });
}

$setLogin.on('click', setAuth.bind(null, 'login'));
$setSignUp.on('click', setAuth.bind(null, 'signup'));
$submitButton.on('click', handleFormSubmit);
