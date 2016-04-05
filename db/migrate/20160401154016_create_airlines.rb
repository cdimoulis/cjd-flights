class CreateAirlines < ActiveRecord::Migration
  def change
    create_table :airlines, id: :uuid, default: "uuid_generate_v4()", force: true do |t|
      t.string :text, null: false
      t.string :code, null: false

      t.timestamps null: false
    end
  end
end
