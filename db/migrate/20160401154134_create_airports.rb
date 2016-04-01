class CreateAirports < ActiveRecord::Migration
  def change
    create_table :airports, id: :uuid, default: "uuid_generate_v4()", force: true do |t|
      t.string :text
      t.string :city, null: false
      t.string :state
      t.string :country, null: false
      t.string :code, null: false
      t.integer :timezone, null: false

      t.timestamps null: false
    end
  end
end
