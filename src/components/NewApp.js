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
    selected : ['p1', 'p2', 'p7', 'p8', 'sh1', 'sh2', 'rh1', 'rh2', 'yk', 's1', 's2', 'sa', 'st'],
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

        <Chag toggleChag={this.toggleChag} name="Purim" bName="pu" selected={this.state.selected.indexOf("pu") > -1}/>

        <Chag toggleChag={this.toggleChag} name="Pesach 1" bName="p1" selected={this.state.selected.indexOf("p1") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 2" bName="p2" selected={this.state.selected.indexOf("p2") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 3" bName="p3" selected={this.state.selected.indexOf("p3") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 4" bName="p4" selected={this.state.selected.indexOf("p4") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 5" bName="p5" selected={this.state.selected.indexOf("p5") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 6" bName="p6" selected={this.state.selected.indexOf("p6") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 7" bName="p7" selected={this.state.selected.indexOf("p7") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 8" bName="p8" selected={this.state.selected.indexOf("p8") > -1}/>

        <Chag toggleChag={this.toggleChag} name="Shavuot 1" bName="sh1" selected={this.state.selected.indexOf("sh1") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Shavuot 2" bName="sh2" selected={this.state.selected.indexOf("sh2") > -1}/>

        <Chag toggleChag={this.toggleChag} name="Tisha b-av" bName="tb" selected={this.state.selected.indexOf("tb") > -1}/>

        <Chag toggleChag={this.toggleChag} name="Rosh Hashana 1" bName="rh1" selected={this.state.selected.indexOf("rh1") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Rosh Hashana 2" bName="rh2" selected={this.state.selected.indexOf("rh2") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Yom Kippur" bName="yk" selected={this.state.selected.indexOf("yk") > -1}/>
        
        <Chag toggleChag={this.toggleChag} name="Sukkot 1" bName="s1" selected={this.state.selected.indexOf("s1") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Sukkot 2" bName="s2" selected={this.state.selected.indexOf("s2") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Sukkot 3" bName="s3" selected={this.state.selected.indexOf("s3") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Sukkot 4" bName="s4" selected={this.state.selected.indexOf("s4") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Sukkot 5" bName="s5" selected={this.state.selected.indexOf("s5") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Sukkot 6" bName="s6" selected={this.state.selected.indexOf("s6") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Sukkot 7" bName="s7" selected={this.state.selected.indexOf("s7") > -1}/>

        <Chag toggleChag={this.toggleChag} name="Shmini Atzeret" bName="sa" selected={this.state.selected.indexOf("sa") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Simchat Torah" bName="st" selected={this.state.selected.indexOf("st") > -1}/>

        <Chag toggleChag={this.toggleChag} name="Chanukah 1" bName="c1" selected={this.state.selected.indexOf("c1") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Chanukah 2" bName="c2" selected={this.state.selected.indexOf("c2") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Chanukah 3" bName="c3" selected={this.state.selected.indexOf("c3") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Chanukah 4" bName="c4" selected={this.state.selected.indexOf("c4") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Chanukah 5" bName="c5" selected={this.state.selected.indexOf("c5") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Chanukah 6" bName="c6" selected={this.state.selected.indexOf("c6") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Chanukah 7" bName="c7" selected={this.state.selected.indexOf("c7") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Chanukah 8" bName="c8" selected={this.state.selected.indexOf("c8") > -1}/>

        <Calc countHolidays={this.countHolidays}/>
        {this.state.displayTable && <ResultsTable tableData={this.state.tableData}/>}
      </div>
    );
  }
}
