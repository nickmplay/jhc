var moment = require('moment');

//date object containing all the chagim to be filtered
const everyChag = [
  {name:"Pesach 1", date:"2016-10-01", leave:"Yes"},
  {name:"Pesach 2", date:"2016-10-02", leave:"Yes"},
  {name:"Pesach 3", date:"2016-10-03", leave:"Yes"},

  {name:"Pesach 1", date:"2017-10-01", leave:"Yes"},
  {name:"Pesach 2", date:"2017-10-02", leave:"Yes"},
  {name:"Pesach 3", date:"2017-10-03", leave:"Yes"},
  {name:"Pesach 4", date:"2017-10-04", leave:"Yes"},
  {name:"Pesach 5", date:"2017-10-05", leave:"Yes"},
  {name:"Pesach 6", date:"2017-10-06", leave:"Bank Holiday"},
  {name:"Pesach 7", date:"2017-10-07", leave:"Saturday"},
  {name:"Pesach 8", date:"2017-10-08", leave:"Sunday"}
];

//data object containing bank holidays
const bankHols = [
  '2017-01-02', '2017-04-14', '2017-04-17', '2017-05-01', '2017-05-29', '2017-08-28', '2017-12-25', '2017-12-26',
  '2018-01-01', '2018-03-30', '2018-04-02', '2018-05-07', '2018-05-28', '2018-08-27', '2018-12-25', '2018-12-26'
];

//helper function to return true if a given date string is within two other date strings
const dateBetween = (date1, date2, dateTest) => {
  const d1 = moment(date1);
  const d2 = moment(date2);
  const dTest = moment(dateTest);

  return (dTest.diff(d1, 'days') >= 0 ) && (dTest.diff(d2, 'days') <= 0 );
}

//helper function to return whether the date is a Saturday or Sunday
const isWeekend = (date1) => {
  const d1 = moment(date1);
  return (d1.format("ddd") == "Sat" || d1.format("ddd") == "Sun");
}

//helper function to return whether a date is a UK bank holiday
const isBankHol = (date1) => {
  return bankHols.indexOf(moment(date1).format("YYYY-MM-DD")) > -1;
}

//filter data object and return those selected within the chosen date range
const processOptions = (startDate, endDate, chagStr) => {
   
  const chagLong = ['Pesach 1','Pesach 2','Pesach 3','Pesach 4','Pesach 5','Pesach 6', 'Pesach 7', 'Pesach 8'];
  
  //reformat data from binary string
  let chagChosen = [];
  for(let i=0; i<chagStr; i++){
    if(chagStr[i] == 1 ){
      chagChosen.push(chagLong[i]);
    }
  }

  //filter everyChag data object on selected options
  let results1 = everyChag.filter((c)=>{return chagChosen.indexOf(c.name) > -1});

  //filter results to be within the specified date range
  let results2 = results1.filter((c)=>{return dateBetween(startDate, endDate, c.date);});

  //return `${startDate} and ${endDate} and ${chagStr}`;
  return results2;
};

module.exports = {
  processOptions, 
  dateBetween, 
  isWeekend,
  isBankHol
};