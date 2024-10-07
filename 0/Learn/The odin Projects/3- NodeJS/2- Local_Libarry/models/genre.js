const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Genre = new Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 100 },
});
Genre.virtual("url").get(function () {
    return `/catalog/Genre/${this.name}`;
});
module.exports = mongoose.model("Genre", Genre);
