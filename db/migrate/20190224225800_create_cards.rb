class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.text :text
      t.references :list, foreign_key: true
      t.integer :position

      t.timestamps
    end
  end
end
