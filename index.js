const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
const morgan = require("morgan");
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
require('./routes/index')(app);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listering on the Port ${PORT}`);
});
