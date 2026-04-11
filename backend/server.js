require('dotenv').config(); //load environment variables from .env file
const app = require('./src/app');
const connectToDB = require('./src/config/database');

connectToDB();

app.listen(5000, () => {
  console.log('server is running on port 5000');
});
