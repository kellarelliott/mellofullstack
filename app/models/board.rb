class Board < ApplicationRecord
  has_many :lists, -> { order(position: :asc) }, :dependent => :destroy
  has_many :user_boards, :dependent => :destroy
end
