const express = require("express");
const cors = require("cors");
require("dotenv").config();
const countriesRouter = require("./routes");

const { PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.use(countriesRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
