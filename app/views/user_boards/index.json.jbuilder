json.array!(@user_boards) do |user_board|
  json.id user_board.id

  json.user do
    json.id user_board.user.id
    json.email user_board.user.email
  end

  json.board do
    json.id user_board.board.id
    json.name user_board.board.name
  end

end
