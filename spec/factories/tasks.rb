# spec/factories/tasks.rb
FactoryBot.define do
  factory :task do
    text { Faker::Lorem.word }
    list_id { nil }
    position { nil }
  end
end