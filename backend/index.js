const express = require("express");
const config = require("config");

const app = express();

require("./startup/config")();
require("./startup/database")();
require("./startup/cros")(app);
require("./startup/routes")(app);
require('./startup/prod')(app);

app.get("/", (req, res) => res.send("Home server page").status(200));

const port = config.get("PORT") || 9000;
app.listen(port, () => console.log("listening on port:", port));
