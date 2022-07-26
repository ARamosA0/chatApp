const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);

// connect to mongodb
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(process.env.MONGO_URL,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

// start the server
const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});