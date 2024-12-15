const { default: mongoose } = require("mongoose");

function dbConnect() {
  mongoose
    .connect(
      "mongodb+srv://crud:1234@cluster0.roq7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("Database is connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = dbConnect;
