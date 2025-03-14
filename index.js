require('dotenv').config();

const express = require('express');
const URL = require('./models/db');
const path = require("path");
const staticRoutes = require('./routes/staticRoutes');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const urlRoute = require('./routes/url');


//set view engine to ejs
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));


//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/url", urlRoute);
app.use("/", staticRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));


// MongoDB Connection
const uri = process.env.MONGODB_URL;
mongoose.connect(uri,
    {
    //  useNewUrlParser: true, 
    // useUnifiedTopology: true 
}
)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));
