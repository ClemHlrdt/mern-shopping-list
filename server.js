const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// cors
app.use(cors());

// Parse incoming requests with json payload (replaces body-parser)
app.use(express.json());

// DB Config
// const db = require('./config/keys').mongoURI;
const db = process.env.MONGO_URI;

// Connect to Mongo
mongoose
  .connect(db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true 
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// Use routes
app.use('/api/items', items); 
app.use('/api/users', users);
app.use('/api/auth', auth);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production'){
  // Set a static folder
  app.use(express.static('client/build'));

  // for any GET route, load index html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index'))
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));