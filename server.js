const app = require('./scr/app');
require('dotenv').config();

const PORT = process.env.PORT || 3008;

app.listen(PORT, (err) => {
  if (err) { 
    console.log('Error at server launch', err)
  }
  console.log(`Server running on port ${PORT}`);
});