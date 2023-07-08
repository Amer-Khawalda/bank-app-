require('dotenv').config({ path: './config.env' });
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cors = require('cors');

const app = express();
const port = process.env.PORT ;

app.use(express.json());
app.use(cors());


 
app.use('/books', require('./routers/books'));

app.use('/auth', require('./routers/auth'));

app.use('/userList', require('./routers/userList'));


app.use('/userInfo', require('./routers/userInfo'));



app.use(errorHandler);


connectDB()
.then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });
