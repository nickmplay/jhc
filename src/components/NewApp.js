import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'whatwg-fetch';
import Chag from './Chag';
import Calc from './Calc';
import ResultsTable from './ResultsTable';
import ResSentence from './ResSentence';
import ErrMsg from './ErrMsg';

export default class NewApp extends React.Component {
  constructor(props){
    super(props);
    this.toggleChag = this.toggleChag.bind(this);
    this.countHolidays = this.countHolidays.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onStartDateFocusChange = this.onStartDateFocusChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onEndDateFocusChange = this.onEndDateFocusChange.bind(this);
    this.chagStr = this.chagStr.bind(this);
    this.validateOptions = this.validateOptions.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }
  state = {
    selected : ['p1', 'p2', 'p7', 'p8', 'sh1', 'sh2', 'rh1', 'rh2', 'yk', 's1', 's2', 'sa', 'st'],
    displayTable : false,
    tableData: false,
    displayResultSentence : false,
    ResultSentence: false,
    startDate: moment("2018-01-01"),
    startDateFocused: false,
    endDate: moment("2018-12-31"),
    endDateFocused: false,
    errs: []
  };

  //scroll to results
  scrollToBottom = () => {
    document.getElementById("end").scrollIntoView();
  }
  
  //handle chagim options de/selected
  toggleChag = (Chag) => {
    let bPresent = (this.state.selected.indexOf(Chag) > -1);
    if (bPresent){
      this.setState((prevState) => ({
        selected: prevState.selected.filter((e) => e !== Chag)
      }));
    } else {
      this.setState((prevState) => ({
        selected: prevState.selected.concat(Chag)
      }));
    }

    //hide table if already present
    this.setState(() => ({ displayTable: false, displayResultSentence: false }));
  }

  //process chagim into a number string
  chagStr = () => {
    //must be the same order as the holidayCalc.chagLong array
    const allChag = [
      'pu','p1','p2','p3','p4','p5','p6','p7','p8', 'sh1', 'sh2', 'tb', 'rh1', 'rh2', 'yk',
      's1', 's2', 's3', 's4', 's5', 's6', 's7', 'sa', 'st',
      'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'
    ];
    return allChag.map((c) => this.state.selected.indexOf(c) > -1 ? 1 : 0 ).join('');
  }

  //handle database query to the server
  countHolidays = () => {
    //validate options
    if(!this.validateOptions()){
      return false;
    }

    //construct query url
    let urlStr = this.state.startDate.format('YYYY-MM-DD');
    urlStr += '/';
    urlStr += this.state.endDate.format('YYYY-MM-DD');
    urlStr += '/';
    //urlStr += '0110001';
    urlStr += this.chagStr();

    //run ajax request to the server
    fetch(urlStr).then( response => response.json()
    ).then( data => {
      //console.log(data);

      //create results sentence
      let numHol = data.filter((e) => e.leave == "Yes" ).length;
      let resStr = `You will need to take #${numHol} days# of annual leave`;
      console.log(resStr); 

      //update React state
      this.setState((prevState) => ({
        displayTable: !prevState.displayTable,
        tableData: data,
        ResultSentence: resStr,
        displayResultSentence: !prevState.displayResultSentence,
      }));
      
      this.scrollToBottom();

    }).catch(err => {
      console.log(err);
    });
  }

  //datePickers state management functions
  onStartDateChange = (startDate) => {
    this.setState(() => ({ startDate }));
  }

  onStartDateFocusChange = ({ focused }) => {
    this.setState(() => ({ startDateFocused: focused }));
  }

  onEndDateChange = (endDate) => {
    this.setState(() => ({ endDate }));
  }

  onEndDateFocusChange = ({ focused }) => {
    this.setState(() => ({ endDateFocused: focused }));
  }

  //input validation
  validateOptions = () => {
    //clear prior validation results if present
    this.setState(() => ({ errs: [] }));
    
    let bFail = false;
    const dMin = moment("2017-01-01");
    const dMax = moment("2019-12-31");
    
    //check start date is later than min
    if(this.state.startDate.diff(dMin, 'days') < 0){
      this.setState((prevState) => ({
        errs: prevState.errs.concat('Choose a start date later than 01/01/2017')
      }));
      bFail = true;
    }

    //check end date is later than min
    if(this.state.endDate.diff(dMin, 'days') < 0){
      this.setState((prevState) => ({
        errs: prevState.errs.concat('Choose an end date later than 01/01/2017')
      }));
      bFail = true;
    }

    //check start date is not later than max
    if(this.state.startDate.diff(dMax, 'days') >= 0){
      this.setState((prevState) => ({
        errs: prevState.errs.concat('Choose a start date before 31/12/2019')
      }));
      bFail = true;
    }

    //check end date is not later than max
    if(this.state.endDate.diff(dMax, 'days') >= 0){
      this.setState((prevState) => ({
        errs: prevState.errs.concat('Choose an end date before 31/12/2019')
      }));
      bFail = true;
    }

    //check at least one option has been selected
    if(this.state.selected.length < 1){
      this.setState((prevState) => ({
        errs: prevState.errs.concat('Choose at least one Jewish holiday')
      }));
      bFail = true;
    }

    //check the start date is after the end date
    if(this.state.startDate.diff(this.state.endDate, 'days') >= 0){
      this.setState((prevState) => ({
        errs: prevState.errs.concat('Choose a start date that is before the end date')
      }));
      bFail = true;
    }

    return !bFail;
  }

  render() {
    return (
      <div>
        <div className='head'>
        <div className='container'>
          <h1>Count Jewish Holidays</h1>
          <h4>Enter the start and end dates, <span className='bc_span'>select</span> the chagim you want to take, then push <span className='bcalc_span'>Count</span> to see how many days of annual leave you'll need </h4>
        </div>
        </div>
        
        <div className='container_flex'>
          
          <p className='container_quarter'>Start Date: </p>
          <SingleDatePicker
            className='container_quarter'
            date={this.state.startDate}
            onDateChange={this.onStartDateChange}
            displayFormat="DD/MM/YYYY"
            anchorDirection="right"
            focused={this.state.startDateFocused}
            onFocusChange={this.onStartDateFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          
          <p className='container_quarter'>End Date: </p>
          <SingleDatePicker
            className='container_quarter'
            date={this.state.endDate}
            onDateChange={this.onEndDateChange}
            displayFormat="DD/MM/YYYY"
            anchorDirection="right"
            focused={this.state.endDateFocused}
            onFocusChange={this.onEndDateFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          
        </div>

        <div className='container_flex'>

        <Chag toggleChag={this.toggleChag} name="Purim" bName="pu" selected={this.state.selected.indexOf("pu") > -1}/>
        <div className='container_break'></div>

        <Chag toggleChag={this.toggleChag} name="Pesach 1" bName="p1" selected={this.state.selected.indexOf("p1") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 2" bName="p2" selected={this.state.selected.indexOf("p2") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 3" bName="p3" selected={this.state.selected.indexOf("p3") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 4" bName="p4" selected={this.state.selected.indexOf("p4") > -1}/>
        <div className='container_break'></div>
        <Chag toggleChag={this.toggleChag} name="Pesach 5" bName="p5" selected={this.state.selected.indexOf("p5") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 6" bName="p6" selected={this.state.selected.indexOf("p6") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 7" bName="p7" selected={this.state.selected.indexOf("p7") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 8" bName="p8" selected={this.state.selected.indexOf("p8") > -1}/>
        <div className='container_break'></div>

        <Chag toggleChag={this.toggleChag} name="Shavuot 1" bName="sh1" selected={this.state.selected.indexOf("sh1") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Shavuot 2" bName="sh2" selected={this.state.selected.indexOf("sh2") > -1}/>
        <div className='container_break'></div>

        <Chag toggleChag={this.toggleChag} name="Tisha b-av" bName="tb" selected={this.state.selected.indexOf("tb") > -1}/>
        <div className='container_break'></div>

        <Chag toggleChag={this.toggleChag} name="Rosh Hashana 1" bName="rh1" selected={this.state.selected.indexOf("rh1") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Rosh Hashana 2" bName="rh2" selected={this.state.selected.indexOf("rh2") > -1}/>
        <div className='container_break'></div>

        <Chag toggleChag={this.toggleChag} name="Yom Kippur" bName="yk" selected={this.state.selected.indexOf("yk") > -1}/>
        <div className='container_break'></div>

        <Chag toggleChag={this.toggleChag} name="Sukkot 1" bName="s1" selected={this.state.selected.indexOf("s1") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Sukkot 2" bName="s2" selected={this.state.selected.indexOf("s2") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Sukkot 3" bName="s3" selected={this.state.selected.indexOf("s3") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Sukkot 4" bName="s4" selected={this.state.selected.indexOf("s4") > -1}/>
        <div className='container_break'></div>
        <Chag toggleChag={this.toggleChag} name="Sukkot 5" bName="s5" selected={this.state.selected.indexOf("s5") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Sukkot 6" bName="s6" selected={this.state.selected.indexOf("s6") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Sukkot 7" bName="s7" selected={this.state.selected.indexOf("s7") > -1}/>
        <div className='container_break'></div>

        <Chag toggleChag={this.toggleChag} name="Shmini Atzeret" bName="sa" selected={this.state.selected.indexOf("sa") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Simchat Torah" bName="st" selected={this.state.selected.indexOf("st") > -1}/>
        <div className='container_break'></div>

        <Chag toggleChag={this.toggleChag} name="Chanukah 1" bName="c1" selected={this.state.selected.indexOf("c1") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Chanukah 2" bName="c2" selected={this.state.selected.indexOf("c2") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Chanukah 3" bName="c3" selected={this.state.selected.indexOf("c3") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Chanukah 4" bName="c4" selected={this.state.selected.indexOf("c4") > -1}/>
        <div className='container_break'></div>
        <Chag toggleChag={this.toggleChag} name="Chanukah 5" bName="c5" selected={this.state.selected.indexOf("c5") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Chanukah 6" bName="c6" selected={this.state.selected.indexOf("c6") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Chanukah 7" bName="c7" selected={this.state.selected.indexOf("c7") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Chanukah 8" bName="c8" selected={this.state.selected.indexOf("c8") > -1}/>
        </div>

        {this.state.errs.length > 0 && <div className='container_flex'><ErrMsg errs={this.state.errs} /></div>}

        <div className='container_flex'>
        <Calc countHolidays={this.countHolidays}/>
        {this.state.displayResultSentence && <ResSentence msg={this.state.ResultSentence}/>}
        {this.state.displayTable && <ResultsTable tableData={this.state.tableData}/>}
        </div>

        <div id='end'></div>
      </div>
    );
  }
}
