const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const uri =
  "mongodb+srv://schless09devtools:Mof14olCRC6DhzQU@cluster0.qpm18gx.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
    // Continue with your backend logic, such as defining routes and starting the server
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

const userSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4(),
    unique: true,
  },
  name: String,
  email: String,
  golfHandicap: Number,
});

const User = mongoose.model("User", userSchema);
