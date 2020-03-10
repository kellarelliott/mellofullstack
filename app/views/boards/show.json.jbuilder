json.id @board.id
json.name @board.name

json.lists @board.lists do |list|
  json.id list.id
  json.title list.title
  json.position list.position

  json.cards list.cards do |card|
    json.id card.id
    json.text card.text
    json.position card.position
  end
end

json.users @board.user_boards do |user_board|
  json.id user_board.user.id
  json.email user_board.user.email
end
