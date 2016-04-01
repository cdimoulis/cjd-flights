class CreateFlights < ActiveRecord::Migration
  def change
    create_table :flights, id: :uuid, default: "uuid_generate_v4()", force: true do |t|
      t.uuid :airline_id, null: false
      t.string :number, null: false
      t.date :departure_date, null: false
      t.date :arrival_date, null: false
      t.time :departure_time, null: false
      t.time :arrival_time, null: false
      t.uuid :departure_airport_id, null: false
      t.uuid :arrival_airport_id, null: false
      t.string :cabin_code, null: false
      t.string :fare_basis
      t.string :aircraft
      t.text :notes

      t.timestamps null: false
    end
  end
end
