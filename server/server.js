const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

//query 'database' API
app.get('/:startDate/:endDate/:chagStr', (req, res) => {
  console.log(req.params.startDate, 'to', req.params.endDate, 'for', req.params.chagStr );
  res.send(req.params.startDate + ' to ' + req.params.endDate + ' for ' + req.params.chagStr);
});

//bad request
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(3000, () => {
  console.log('server is up on port 3000');
});