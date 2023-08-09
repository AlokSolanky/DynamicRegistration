const express = require("express");
const routes = require("./routes/user_routes");
const bodyParser = require("body-parser");
const sequelize = require("./database/database");

const app = express();

app.use(bodyParser.json());

app.use(express.static("public"));

app.use(routes);

sequelize
  .sync()
  .then((result) => {
    const port = 3000;
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
