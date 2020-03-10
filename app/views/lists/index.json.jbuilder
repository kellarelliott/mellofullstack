json.array!(@lists) do |list|
  json.id list.id
  json.title list.title
  json.position list.position
  json.board_id list.board_id

  json.cards list.cards do |card|
    json.id card.id
    json.text card.text
    json.position card.position
  end
end
