class List < ApplicationRecord
  belongs_to :board
  validates_presence_of :board

  has_many :cards, -> { order(position: :asc) }, :dependent => :destroy
  acts_as_list scope: :board
end
