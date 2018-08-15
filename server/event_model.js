const mongoose = require('mongoose')

const Schema = mongoose.Schema

let EventSchema = new Schema({

  usuario: { type: String, required: true },
  title: { type: String, required: true},
  start: { type: String, required: true},
  allDay: { type: Boolean},
  end: { type: String},
  start_hour: { type: String},
  end_hour: { type: String}
})

let EventModel = mongoose.model('events', EventSchema)

module.exports = EventModel
