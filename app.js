const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log('listening at port: ', port);
});

app.get('/', (req, res) => {
  res.send('hiiii!');
});

app.use(function(req, res, next) {
    console.log(req.url);
    next();
});
