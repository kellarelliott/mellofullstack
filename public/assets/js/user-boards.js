const $logoutButton = $('#logout');
const $newBoardButton = $('#new-board');
const $boardNameInput = $('#board-name');
const $saveBoardButton = $('#save-board');
const $boardsContainer = $('.boards');

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

  getUserBoards();
}

function getUserBoards() {
  $.ajax({
    url: `/api/users/${user.id}`,
    method: 'GET'
  }).then(function (data) {
    renderBoards(data.boards);
  });
}

function renderBoards(boards) {
  $boardsContainer.empty();

  let $boardTiles = boards.map(function (board) {
    let $boardTile = $('<a class="board-tile">')
      .attr('href', `/boards/${board.id}`)
      .text(board.name);

    return $boardTile;
  });

  $boardsContainer.append($boardTiles);
}

function handleBoardCreate(event) {
  event.preventDefault();

  let boardName = $boardNameInput.val().trim();

  $boardNameInput.val('');

  if (!boardName) {
    return;
  }

  $.ajax({
    url: '/api/boards',
    data: {
      name: boardName
    },
    method: 'POST'
  }).then(function () {
    getUserBoards();
    MicroModal.close('create-board');
  });
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
