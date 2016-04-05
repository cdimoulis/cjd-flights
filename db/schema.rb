# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160401185608) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "airlines", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "text",       null: false
    t.string   "code",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "airports", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "text"
    t.string   "city",       null: false
    t.string   "state"
    t.string   "country",    null: false
    t.string   "code",       null: false
    t.integer  "timezone",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "flights", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.uuid     "airline_id",           null: false
    t.string   "number",               null: false
    t.datetime "departure_date",       null: false
    t.datetime "arrival_date",         null: false
    t.uuid     "departure_airport_id", null: false
    t.uuid     "arrival_airport_id",   null: false
    t.string   "cabin_code",           null: false
    t.string   "fare_basis"
    t.string   "aircraft"
    t.text     "notes"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "trip_flights", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.uuid     "trip_id",    null: false
    t.uuid     "flight_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trips", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "text",                             null: false
    t.string   "cabin",                            null: false
    t.string   "trip_type",  default: "roundTrip"
    t.float    "price"
    t.text     "notes"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

end
