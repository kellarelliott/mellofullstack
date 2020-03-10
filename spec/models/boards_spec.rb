# spec/models/board_spec.rb
require 'rails_helper'

RSpec.describe Board, type: :model do
  it { should have_many(:lists).dependent(:destroy) }
  it { should have_many(:user_boards).dependent(:destroy) }

end