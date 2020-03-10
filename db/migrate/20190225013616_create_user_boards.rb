class CreateUserBoards < ActiveRecord::Migration[5.2]
  def change
    create_table :user_boards do |t|
      t.references :board, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
