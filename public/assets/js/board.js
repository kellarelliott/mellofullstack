const $logoutButton = $('#logout');
const $boardContainer = $('.container');

let board;

init();

function init() {
  let boardID = location.pathname.split('/')[2];
  getBoard(boardID);
}

function getBoard(id) {
  $.ajax({
    url: `/api/boards/${id}`,
    method: 'GET'
  }).then(function (data) {
    board = data;
    renderBoard();
  })
    .catch(function (err) {
      location.replace('/boards');
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

function createLists(lists) {
  let $listContainers = lists.map(function (list) {
    let $listContainer = $('<div class="list">');
    let $header = $('<header>');
    let $headerButton = $('<button>').text(list.title);
    let $addCardButton = $('<button>Add a card...</button>');

    $header.append($headerButton);
    $listContainer.append($header);
    $listContainer.append($addCardButton);

    return $listContainer;
  });

  return $listContainers;
}

function renderBoard() {
  let $lists = createLists(board.lists);

  $boardContainer.empty();
  $boardContainer.append($lists);
}

$logoutButton.on('click', handleLogout);
