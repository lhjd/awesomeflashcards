class CreateWords < ActiveRecord::Migration[6.0]
  def change
    create_table :words do |t|
      t.boolean :easy, default: false
      t.boolean :hard, default: false
      t.references :user
      t.references :card
      t.timestamps
    end
  end
end
