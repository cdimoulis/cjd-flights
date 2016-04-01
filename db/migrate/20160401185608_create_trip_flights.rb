class CreateTripFlights < ActiveRecord::Migration
  def change
    create_table :trip_flights, id: :uuid, default: "uuid_generate_v4()", force: true do |t|
      t.uuid :trip_id, null: false
      t.uuid :flight_id, null: false

      t.timestamps null: false
    end
  end
end
