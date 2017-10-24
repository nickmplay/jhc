import React from 'react';

export default class ErrMsg extends React.Component {
  render(){
    return (
      <div>
        {this.props.errs.map((item, i) => <h4  key={i} className='errmsg'>{item}</h4> )}
      </div>
    );
  }
}
