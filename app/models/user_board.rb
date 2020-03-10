class UserBoard < ApplicationRecord
  belongs_to :board
  validates_presence_of :board
  belongs_to :user
  validates_presence_of :user
  validates_uniqueness_of :user_id, :scope => :board_id
end
