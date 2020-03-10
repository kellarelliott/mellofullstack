json.id @user.id
json.email @user.email
json.created_at @user.created_at
json.updated_at @user.updated_at

json.boards @user.user_boards do |user_board|
  json.id user_board.board.id
  json.name user_board.board.name
end
