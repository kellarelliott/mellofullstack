const $logoutButton = $('#logout');
const $newBoardButton = $('#new-board');
const $boardNameInput = $('#board-name');
const $saveBoardButton = $('#save-board');

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

function handleBoardCreate(event) {
  event.preventDefault();

  let boardName = $boardNameInput.val().trim();

  $boardNameInput.val('');

  console.log(boardName);
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
$newBoardButton.on('click', MicroModal.show.bind(null, 'create-board'));
$saveBoardButton.on('click', handleBoardCreate);
