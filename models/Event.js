const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    categorie: {
        type: String,
        require: true
    },
    subscribe: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Event = mongoose.model('event',EventSchema);