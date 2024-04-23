const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require('./routes')
const cors = require('cors');
const cookieParser = require('cookie-parser')

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser())

routes(app);

// Set mongoose strictQuery option to false to suppress deprecation warning
mongoose.set('strictQuery', false);
console.log('process.env.MONGO_DB', process.env.CLIENT_ID)
mongoose.connect(`${process.env.MONGODB_URI}`)
    .then(() => {
        console.log('Connected to MongoDB successfully!')
        // Start the server after successful MongoDB connection
        app.listen(port, () => {
            console.log('Server is running on port:', port);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
