class CreateWords < ActiveRecord::Migration[6.0]
  def change
    create_table :words do |t|
      t.boolean :isEasy, default: false
      t.boolean :isHard, default: false
      t.references :card
      t.references :user

      t.timestamps
    end
  end
end
