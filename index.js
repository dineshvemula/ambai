const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();
const { createConnectionPool } = require('./config/db');
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
const morgan = require("morgan");
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
require('./routes/index')(app);
app.use((error, req, res, next) => {
  return res.status(400).json({ error: error, message: 'something went wrong', status: 400 });
})



const PORT = process.env.PORT || 3000;


async function start() {
  await createConnectionPool();
  app.listen(PORT, () => {
    console.log(`Server is listering on the Port ${PORT}`);
  });
}

start();