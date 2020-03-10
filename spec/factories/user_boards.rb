# spec/factories/user_board.rb
FactoryBot.define do
  factory :user_board do
    board_id { Faker::Lorem.int }
    user_id { Faker::Lorem.int }
  end
end