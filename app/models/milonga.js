var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MilongaSchema   = new Schema({
    Name: String,
    Day : String,
    Description : String,
    Address : String,
    Organizer : String,
    CreateDate : String,
    ImageUrl : String,
    Location : String
});

module.exports = mongoose.model('Milonga', MilongaSchema);


