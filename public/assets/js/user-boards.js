const $logoutButton = $('#logout');

let user;

init();

function init() {
  user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    localStorage.clear();
    location.replace('/');
    return;
  }

  $('.welcome h1').text('Welcome ' + user.email + '!');
}

function handleLogout() {
  $.ajax({
    url: '/logout',
    method: 'DELETE'
  }).then(function () {
    localStorage.clear();
    location.replace('/');
  });
}

$logoutButton.on('click', handleLogout);
