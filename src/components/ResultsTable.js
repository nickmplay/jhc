import React from 'react';

const TableRows = props => <tbody>{props.tableData.map((item, i) => {
  return <tr key={i}>
    <td>{item.date}</td>
    <td>{item.name}</td>
    <td>{item.leave}</td>
  </tr>})
}</tbody>;

export default class ResultsTable extends React.Component {
  render(){
    return (
      <table className="results-table">
      <thead><tr><th>Date</th><th>Name</th><th>Annual leave?</th></tr></thead>
        <TableRows tableData={this.props.tableData} />
      </table>
    );
  }
}
