var moment = require('moment');

//date object containing all the chagim to be filtered
const everyChag = [
  {name:"Purim", date:"2017-03-12"},
  {name:"Pesach 1", date:"2017-04-11"},
  {name:"Pesach 2", date:"2017-04-12"},
  {name:"Pesach 3", date:"2017-04-13"},
  {name:"Pesach 4", date:"2017-04-14"},
  {name:"Pesach 5", date:"2017-04-15"},
  {name:"Pesach 6", date:"2017-04-16"},
  {name:"Pesach 7", date:"2017-04-17"},
  {name:"Pesach 8", date:"2017-04-18"},
  {name:"Shavuot 1", date:"2017-05-31"},
  {name:"Shavuot 2", date:"2017-06-01"},
  {name:"Tisha b-av", date:"2017-08-01"},
  {name:"Rosh Hashana 1", date:"2017-09-21"},
  {name:"Rosh Hashana 2", date:"2017-09-22"},
  {name:"Yom Kippur", date:"2017-09-30"},
  {name:"Sukkot 1", date:"2017-10-05"},
  {name:"Sukkot 2", date:"2017-10-06"},
  {name:"Sukkot 3", date:"2017-10-07"},
  {name:"Sukkot 4", date:"2017-10-08"},
  {name:"Sukkot 5", date:"2017-10-09"},
  {name:"Sukkot 6", date:"2017-10-10"},
  {name:"Sukkot 7", date:"2017-10-11"},
  {name:"Shmini Atzeret", date:"2017-10-12"},
  {name:"Simchat Torah", date:"2017-10-13"},
  {name:"Chanukah 1", date:"2017-12-13"},
  {name:"Chanukah 2", date:"2017-12-14"},
  {name:"Chanukah 3", date:"2017-12-15"},
  {name:"Chanukah 4", date:"2017-12-16"},
  {name:"Chanukah 5", date:"2017-12-17"},
  {name:"Chanukah 6", date:"2017-12-18"},
  {name:"Chanukah 7", date:"2017-12-19"},
  {name:"Chanukah 8", date:"2017-12-20"},
  
  {name:"Purim", date:"2018-03-01"},
  {name:"Pesach 1", date:"2018-03-31"},
  {name:"Pesach 2", date:"2018-04-01"},
  {name:"Pesach 3", date:"2018-04-02"},
  {name:"Pesach 4", date:"2018-04-03"},
  {name:"Pesach 5", date:"2018-04-04"},
  {name:"Pesach 6", date:"2018-04-05"},
  {name:"Pesach 7", date:"2018-04-06"},
  {name:"Pesach 8", date:"2018-04-07"},
  {name:"Shavuot 1", date:"2018-05-20"},
  {name:"Shavuot 2", date:"2018-05-21"},
  {name:"Tisha b-av", date:"2018-07-22"},
  {name:"Rosh Hashana 1", date:"2018-09-10"},
  {name:"Rosh Hashana 2", date:"2018-09-11"},
  {name:"Yom Kippur", date:"2018-09-19"},
  {name:"Sukkot 1", date:"2018-09-24"},
  {name:"Sukkot 2", date:"2018-09-25"},
  {name:"Sukkot 3", date:"2018-09-26"},
  {name:"Sukkot 4", date:"2018-09-27"},
  {name:"Sukkot 5", date:"2018-09-28"},
  {name:"Sukkot 6", date:"2018-09-29"},
  {name:"Sukkot 7", date:"2018-09-30"},
  {name:"Shmini Atzeret", date:"2018-10-01"},
  {name:"Simchat Torah", date:"2018-10-02"},
  {name:"Chanukah 1", date:"2018-12-03"},
  {name:"Chanukah 2", date:"2018-12-04"},
  {name:"Chanukah 3", date:"2018-12-05"},
  {name:"Chanukah 4", date:"2018-12-06"},
  {name:"Chanukah 5", date:"2018-12-07"},
  {name:"Chanukah 6", date:"2018-12-08"},
  {name:"Chanukah 7", date:"2018-12-09"},
  {name:"Chanukah 8", date:"2018-12-10"},
  
  {name:"Purim", date:"2019-03-21"},
  {name:"Pesach 1", date:"2019-04-20"},
  {name:"Pesach 2", date:"2019-04-21"},
  {name:"Pesach 3", date:"2019-04-22"},
  {name:"Pesach 4", date:"2019-04-23"},
  {name:"Pesach 5", date:"2019-04-24"},
  {name:"Pesach 6", date:"2019-04-25"},
  {name:"Pesach 7", date:"2019-04-26"},
  {name:"Pesach 8", date:"2019-04-27"},
  {name:"Shavuot 1", date:"2019-06-09"},
  {name:"Shavuot 2", date:"2019-06-10"},
  {name:"Tisha b-av", date:"2019-08-11"},
  {name:"Rosh Hashana 1", date:"2019-09-30"},
  {name:"Rosh Hashana 2", date:"2019-10-01"},
  {name:"Yom Kippur", date:"2019-10-09"},
  {name:"Sukkot 1", date:"2019-10-14"},
  {name:"Sukkot 2", date:"2019-10-15"},
  {name:"Sukkot 3", date:"2019-10-16"},
  {name:"Sukkot 4", date:"2019-10-17"},
  {name:"Sukkot 5", date:"2019-10-18"},
  {name:"Sukkot 6", date:"2019-10-19"},
  {name:"Sukkot 7", date:"2019-10-20"},
  {name:"Shmini Atzeret", date:"2019-10-21"},
  {name:"Simchat Torah", date:"2019-10-22"},
  {name:"Chanukah 1", date:"2019-12-23"},
  {name:"Chanukah 2", date:"2019-12-24"},
  {name:"Chanukah 3", date:"2019-12-25"},
  {name:"Chanukah 4", date:"2019-12-26"},
  {name:"Chanukah 5", date:"2019-12-27"},
  {name:"Chanukah 6", date:"2019-12-28"},
  {name:"Chanukah 7", date:"2019-12-29"},
  {name:"Chanukah 8", date:"2019-12-30"} 
];

//data object containing bank holidays
const bankHols = [
  '2017-01-02', '2017-04-14', '2017-04-17', '2017-05-01', '2017-05-29', '2017-08-28', '2017-12-25', '2017-12-26',
  '2018-01-01', '2018-03-30', '2018-04-02', '2018-05-07', '2018-05-28', '2018-08-27', '2018-12-25', '2018-12-26',
  '2019-01-01', '2019-04-19', '2019-04-22', '2019-05-06', '2019-05-27', '2019-08-26', '2019-12-25', '2019-12-26'
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
   
  const chagLong = [
    'Purim', 'Pesach 1','Pesach 2','Pesach 3','Pesach 4','Pesach 5','Pesach 6', 'Pesach 7', 'Pesach 8',
    'Shavuot 1', 'Shavuot 2', 'Tisha b-av', 'Rosh Hashana 1', 'Rosh Hashana 2', 'Yom Kippur', 
    'Sukkot 1', 'Sukkot 2', 'Sukkot 3', 'Sukkot 4', 'Sukkot 5', 'Sukkot 6', 'Sukkot 7',
    'Shmini Atzeret', 'Simchat Torah', 
    'Chanukah 1', 'Chanukah 2', 'Chanukah 3', 'Chanukah 4', 'Chanukah 5', 'Chanukah 6', 'Chanukah 7', 'Chanukah 8' 
  ];
  
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

  //add whether the chag is at the weekend or on a bank holiday
  for(let i=0; i<results2.length; i++){
    if(isBankHol(results2[i].date)){
      results2[i].leave = 'Bank Holiday';
    } else if (isWeekend(results2[i].date)){
      results2[i].leave = 'Weekend';
    } else {
      results2[i].leave = 'Yes';
    }
  }

  //return `${startDate} and ${endDate} and ${chagStr}`;
  return results2;
};

module.exports = {
  processOptions, 
  dateBetween, 
  isWeekend,
  isBankHol
};