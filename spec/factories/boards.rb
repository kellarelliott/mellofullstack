# spec/factories/boards.rb
FactoryBot.define do
  factory :board do
    name { Faker::Lorem.word }
  end
end