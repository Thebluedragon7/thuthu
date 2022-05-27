require("dotenv").config();
const express = require("express");
const home = require("./routes/homeRouter");
const bodyParser = require("body-parser");
const es6Renderer = require("express-es6-template-engine");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.engine("html", es6Renderer);
app.set("views", "views");
app.set("view engine", "html");
app.use(express.json());

app.use("", home);

mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@alert-bluedragon.x77pp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MDB successfully!");
  })
  .catch((err) => {
    console.log(err);
  });
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
