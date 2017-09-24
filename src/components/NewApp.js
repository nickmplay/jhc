import React from 'react';
import Chag from './Chag';
import Calc from './Calc';


export default class NewApp extends React.Component {
  constructor(props){
    super(props);
    this.toggleChag = this.toggleChag.bind(this);
    this.countHolidays = this.countHolidays.bind(this);
  }
  state = {
    selected : ["p1","p3"],
    displayTable : false,
  };

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
  }

  countHolidays = () => {
    this.setState((prevState) => ({
      displayTable: !prevState.displayTable
    }));
  }

  render() {
    return (
      <div>
        <h1>Count Jewish Holidays</h1>
        <h4>Select chagim</h4>
        <Chag toggleChag={this.toggleChag} name="Pesach 1" bName="p1" selected={this.state.selected.indexOf("p1") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 2" bName="p2" selected={this.state.selected.indexOf("p2") > -1}/>
        <Chag toggleChag={this.toggleChag} name="Pesach 3" bName="p3" selected={this.state.selected.indexOf("p3") > -1}/>

        <Calc countHolidays={this.countHolidays}/>
        {this.state.displayTable && <p>Show Results</p>}
      </div>
    );
  }
}
