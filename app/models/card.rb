class Card < ApplicationRecord
  belongs_to :list
  validates_presence_of :list
  acts_as_list scope: :list
end
