# spec/factories/lists.rb
FactoryBot.define do
  factory :list do
    title { Faker::Lorem.word }
    board_id { nil }
    position { nil }
  end
end