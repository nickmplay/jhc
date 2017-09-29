const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

const dummyResultsServer = [
  {name:"Pesach 5", date:"5/10/2017", leave:"Yes"},
  {name:"Pesach 6", date:"6/10/2017", leave:"Bank Holiday"},
  {name:"Pesach 7", date:"7/10/2017", leave:"Saturday"},
  {name:"Pesach 8", date:"8/10/2017", leave:"Sunday"}
];

//query 'database' API
app.get('/:startDate/:endDate/:chagStr', (req, res) => {
  console.log(req.params.startDate, 'to', req.params.endDate, 'for', req.params.chagStr );
  res.send(dummyResultsServer);
});

//bad request
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(3000, () => {
  console.log('server is up on port 3000');
});