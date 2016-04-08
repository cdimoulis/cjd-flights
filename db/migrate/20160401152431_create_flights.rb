class CreateFlights < ActiveRecord::Migration
  def change
    create_table :flights, id: :uuid, default: "uuid_generate_v4()", force: true do |t|
      t.uuid :airline_id, null: false
      t.string :number, null: false
      t.datetime :departure_date, null: false
      t.datetime :arrival_date, null: false
      t.uuid :departure_airport_id, null: false
      t.uuid :arrival_airport_id, null: false
      t.string :cabin_code, null: false
      t.string :fare_basis
      t.string :aircraft
      t.text :notes

      t.timestamps null: false
    end

    add_index :flights, :airline_id
    add_index :flights, :departure_airport_id
    add_index :flights, :arrival_airport_id
    add_index :flights, :aircraft
  end
end
