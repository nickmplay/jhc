import React from 'react';

export default class ResSentence extends React.Component {
  render(){
    console.log(this.props);
    let temp = this.props.msg.split("#");
    
    return (
      <div className='resMsg'>
        {temp[0]}<span className='bc_span'>{temp[1]}</span>{temp[2]}
      </div>
    );
  }
}