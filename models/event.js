const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    title:      {type: String, required:true},
    description:{type: String, required:true},
    price:      {type: Number, required:true},
    date:       {type: Date, required:true},
    creator:    {type: Schema.Types.ObjectId, ref: ''}

})

//first argument is arbitrary - it will be the name of the schema used in app.js
module.exports = mongoose.model('Event', eventSchema)