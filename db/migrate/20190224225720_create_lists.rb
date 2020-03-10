class CreateLists < ActiveRecord::Migration[5.2]
  def change
    create_table :lists do |t|
      t.string :title
      t.references :board, foreign_key: true
      t.integer :position

      t.timestamps
    end
  end
end
