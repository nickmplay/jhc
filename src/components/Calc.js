import React from 'react';

export default class Calc extends React.Component {
  render(){
    return (
      <button 
        className="button-calc"
        onClick={this.props.countHolidays}
      >Count Number of holiday days needed
      </button>
    );
  }
}