class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips, id: :uuid, default: "uuid_generate_v4()", force: true do |t|
      t.string :cabin, null: false
      t.string :type, default: "roundTrip"
      t.float :price

      t.timestamps null: false
    end
  end
end
