import React from 'react';


export default class Chag extends React.Component {
  constructor(props){
    super(props);
    this.processButton = this.processButton.bind(this);
  }

  processButton = () => {
    this.props.toggleChag(this.props.bName);
  }

  render(){
    let cn;
    if( this.props.selected ) {
      cn = "button-chosen";
    } else {
      cn = "button-not-chosen";
    }
    return (
        <div className='container_quarter'>
        <button
          onClick={this.processButton}
          className={cn}  
          name={this.props.bName}
        >
        {this.props.name}
        </button>    
        </div>
    );
  }
}