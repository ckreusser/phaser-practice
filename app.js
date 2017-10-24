const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log('listening at port: ', port);
});
