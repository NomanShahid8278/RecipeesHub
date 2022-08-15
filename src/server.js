const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cors = require("cors");

const dbConnect = require("./config/dbConnection");
const routes = require("./routes");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

// log requests
app.use(morgan("tiny"));

// Making requests
app.use(cors());

// mongodb connection
dbConnect();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// load routers
routes(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
