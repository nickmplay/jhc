const path = require('path');
const express = require('express');
const holidayCalc = require('./holidayCalc.js');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3001;
app.use(express.static(publicPath));

//query 'database' API
app.get('/:startDate/:endDate/:chagStr', (req, res) => {
  console.log(req.params.startDate, 'to', req.params.endDate, 'for', req.params.chagStr );
  //console.log(holidayCalc.processOptions(req.params.startDate, req.params.endDate, req.params.chagStr));
  res.send(holidayCalc.processOptions(req.params.startDate, req.params.endDate, req.params.chagStr));
});

//bad request
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});