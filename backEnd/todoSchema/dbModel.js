const { default: mongoose } = require("mongoose");

let dbModel = new mongoose.Schema({
  task: {
    type: String,
  },
});

module.exports = mongoose.model("Todo", dbModel);
