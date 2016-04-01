class CreateAirlines < ActiveRecord::Migration
  def change
    create_table :airlines, id: :uuid, default: "uuid_generate_v4()", force: true do |t|
      t.string :text
      t.string :code
      
      t.timestamps null: false
    end
  end
end
