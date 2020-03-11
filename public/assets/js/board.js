const $logoutButton = $('#logout');
const $boardContainer = $('.container');
const $boardName = $('header > h1');
const $createListInput = $('#create-list input');
const $saveListButton = $('#create-list .save');
const $createCardInput = $('#create-card textarea');
const $saveCardButton = $('#create-card .save');
const $editListInput = $('#edit-list input');
const $editListSaveButton = $('#edit-list .save');
const $editListDeleteButton = $('#edit-list .delete');
const $editCardInput = $('#edit-card textarea');
const $editCardSaveButton = $('#edit-card .save');
const $editCardDeleteButton = $('#edit-card .delete');


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

function createCards(cards) {
  let $cardUl = $('<ul>');

  let $cardLis = cards.map(function (card) {
    let $cardLi = $('<li>');
    let $cardButton = $('<button>').text(card.text)
      .data(card)
      .on('click', openCardEditModal);
    ;

    $cardLi.append($cardButton);

    return $cardLi;
  });

  $cardUl.append($cardLis);

  return $cardUl;
}

function createLists(lists) {
  let $listContainers = lists.map(function (list) {
    let $listContainer = $('<div class="list">').data('id', list.id);
    let $header = $('<header>');
    let $headerButton = $('<button>').text(list.title)
      .data(list)
      .on('click', openListEditModal);;
    let $cardUl = createCards(list.cards);
    let $addCardButton = $('<button>Add a card...</button>').on(
      'click',
      openCardCreateModal
    );

    $header.append($headerButton);
    $listContainer.append($header);
    $listContainer.append($cardUl);
    $listContainer.append($addCardButton);

    return $listContainer;
  });

  let $addListContainer = $('<div class="list add">');
  let $addListButton = $('<button>')
    .text('+ Add another list')
    .on('click', openListCreateModal);

  $addListContainer.append($addListButton);
  $listContainers.push($addListContainer);
  return $listContainers;
}

function renderBoard() {
  let $lists = createLists(board.lists);

  $boardName.text(board.name);

  $boardContainer.empty();
  $boardContainer.append($lists);
}

function openListCreateModal() {
  $createListInput.val('');
  MicroModal.show(`create-list`);
}

function handleListCreate(event) {
  event.preventDefault();

  let listTitle = $createListInput.val().trim();

  if (!listTitle) {
    MicroModal.close('create-list');
    return;
  }

  $.ajax({
    url: '/api/lists',
    method: 'POST',
    data: {
      board_id: board.id,
      title: listTitle
    }
  }).then(function () {
    init();
    MicroModal.close('create-list');
  });
}

function openCardCreateModal() {
  let $listContainer = $(event.target).parents('.list');
  let listId = $listContainer.data('id');

  $saveCardButton.data('id', listId);

  $createCardInput.val('');
  MicroModal.show('create-card');
}

function handleCardCreate(event) {
  event.preventDefault();

  let listId = $(event.target).data('id');
  let cardText = $createCardInput.val().trim();

  if (!cardText) {
    MicroModal.close('create-card');
    return;
  }

  $.ajax({
    url: '/api/cards',
    method: 'POST',
    data: {
      list_id: listId,
      text: cardText
    }
  }).then(function () {
    init();
    MicroModal.close('create-card');
  });
}

function openListEditModal(event) {
  let listData = $(event.target).data();

  $editListInput.val(listData.title);
  $editListSaveButton.data(listData);
  $editListDeleteButton.data(listData);

  MicroModal.show('edit-list');
}

function handleListEdit() {
  event.preventDefault();

  let { title, id } = $(event.target).data();
  let newTitle = $editListInput.val().trim();

  if (!newTitle || newTitle === title) {
    MicroModal.close('edit-list');
    return;
  }

  $.ajax({
    url: `/api/lists/${id}`,
    method: 'PUT',
    data: {
      title: newTitle
    }
  }).then(function () {
    init();
    MicroModal.close('edit-list');
  });
}

function handleListDelete() {
  event.preventDefault();

  let { id } = $(event.target).data();

  $.ajax({
    url: `/api/lists/${id}`,
    method: 'DELETE'
  }).then(function () {
    init();
    MicroModal.close('edit-list');
  });
}

function openCardEditModal(event) {
  let cardData = $(event.target).data();

  $editCardInput.val(cardData.text);
  $editCardSaveButton.data(cardData);
  $editCardDeleteButton.data(cardData);
  MicroModal.show('edit-card');
}

function handleCardSave(event) {
  event.preventDefault();

  let { text, id } = $(event.target).data();
  let newText = $editCardInput.val().trim();

  if (!newText || newText === text) {
    MicroModal.close('edit-card');
    return;
  }

  $.ajax({
    url: `/api/cards/${id}`,
    method: 'PUT',
    data: {
      text: newText
    }
  }).then(function () {
    init();
    MicroModal.close('edit-card');
  });
}

}

function handleCardDelete(event) {
  event.preventDefault();

  event.preventDefault();

  let { id } = $(event.target).data();

  $.ajax({
    url: `/api/cards/${id}`,
    method: 'DELETE'
  }).then(function () {
    init();
    MicroModal.close('edit-card');
  });
}

$saveCardButton.on('click', handleCardCreate);
$saveListButton.on('click', handleListCreate);
$logoutButton.on('click', handleLogout);
$editListSaveButton.on('click', handleListEdit);
$editListDeleteButton.on('click', handleListDelete);
$editCardSaveButton.on('click', handleCardSave);
$editCardDeleteButton.on('click', handleCardDelete);
