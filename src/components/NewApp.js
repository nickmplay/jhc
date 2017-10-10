import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'whatwg-fetch';
import Chag from './Chag';
import Calc from './Calc';
import ResultsTable from './ResultsTable';

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
  }
  state = {
    selected : ["p1","p3"],
    displayTable : false,
    tableData: false,
    startDate: moment("2017-01-01"),
    startDateFocused: false,
    endDate: moment("2017-12-31"),
    endDateFocused: false
  };

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
    this.setState(() => ({ displayTable : false }));
  }

  //process chagim into a number string
  chagStr = () => {
    const allChag = ['p1','p2','p3','p4','p5','p6','p7','p8'];
    return allChag.map((c) => this.state.selected.indexOf(c) > -1 ? 1 : 0 ).join('');
  }

  //handle database query to the server
  countHolidays = () => {
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
      console.log(data);

      //update React state
      this.setState((prevState) => ({
        displayTable: !prevState.displayTable,
        tableData: data
      }));

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

  render() {
    return (
      <div>
        <h1>Count Jewish Holidays</h1>
        <h4>Enter the start and end dates, select chagim, then push Calculate to see how many days of annual leave you'll need </h4>

        <p>Start Date: </p>
        <SingleDatePicker
          date={this.state.startDate}
          onDateChange={this.onStartDateChange}
          displayFormat="DD/MM/YYYY"
          focused={this.state.startDateFocused}
          onFocusChange={this.onStartDateFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />

        <p>End Date: </p>
        <SingleDatePicker
          date={this.state.endDate}
          onDateChange={this.onEndDateChange}
          displayFormat="DD/MM/YYYY"
          focused={this.state.endDateFocused}
          onFocusChange={this.onEndDateFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />

        <Chag toggleChag={this.toggleChag} name="Pesach 1" bName="p1" selected={this.state.selected.indexOf("p1") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 2" bName="p2" selected={this.state.selected.indexOf("p2") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 3" bName="p3" selected={this.state.selected.indexOf("p3") > -1}/>

        <Calc countHolidays={this.countHolidays}/>
        {this.state.displayTable && <ResultsTable tableData={this.state.tableData}/>}
      </div>
    );
  }
}
