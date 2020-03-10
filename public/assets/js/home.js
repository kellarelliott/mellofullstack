const $setLogin = $('#login');
const $setSignUp = $('#signup');

let authSetting = 'login';

function setAuth(setting) {
  authSetting = setting;

  if (authSetting === 'login') {
    $setLogin.addClass('active');
    $setSignUp.removeClass('active');
  } else {
    $setSignUp.addClass('active');
    $setLogin.removeClass('active');
  }
}

$setLogin.on('click', setAuth.bind(null, 'login'));
$setSignUp.on('click', setAuth.bind(null, 'signup'));
