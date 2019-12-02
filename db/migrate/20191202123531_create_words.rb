class CreateWords < ActiveRecord::Migration[6.0]
  def change
    create_table :words do |t|
      t.string :easy
      t.string :hard
      t.references :user
      t.timestamps
    end
  end
end
