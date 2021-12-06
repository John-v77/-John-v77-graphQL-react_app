const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: {type: String, required:true},
    description:{type: String, required:true},
    price:{type: Number, required:true},
    date:{type: Date, required:true}
})

//first argument is arbitrary - it will be the name of the schema used in app.js
mongoose.model('Event', eventSchema)