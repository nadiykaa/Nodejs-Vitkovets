const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

const staticFilesDirectoryPath = path.join(__dirname, '../../public');

// Підключаємо middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static(staticFilesDirectoryPath));

// Підключаємо router для користувачів
const userRouter = require('../routers/user');
app.use('/users', userRouter);

// Обробник помилки 404 (Маршрут не знайдено)
app.use((_, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  });
});

app.use((err, req, res, next) => {
    if (!err.status) {
      err.status = 500;
    }
  
    const status = err.status;
    const errorMessage = err.message;
    const errorData = err.data;
  
    let responseData = {
      status: '',
      code: status,
      message: errorMessage,
      data: ''
    };
  
    if (status === 500) {
      responseData.status = 'fail';
      responseData.data = 'Internal Server Error';
    } else {
      responseData.status = 'error';
      responseData.data = errorData;
    }
  
    res.status(status).json(responseData);
  });

  
module.exports = app;
