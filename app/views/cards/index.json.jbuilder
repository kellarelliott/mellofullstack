json.array!(@cards) do |card|
  json.id card.id
  json.text card.text
  json.position card.position
  json.list_id card.list_id
end
