import React from 'react';
import ChildComponent from './ChildComponent';
import AddComponent from './AddComponent';
class MyComponent extends React.Component {
  state = {
    arrJobs: [
      { id: '1', title: 'Bao ve', salary: '500' },
      { id: '2', title: 'Boi ban', salary: '400' },
      { id: '3', title: 'Quan ly', salary: '800' },
    ],
  };
  addNewJob=(job)=>{
    console.log('alo: ',job)
    this.setState({
      arrJobs:[...this.state.arrJobs,job]
    })
  }
  deleteAjob=(job)=>{
    let currentJobs=this.state.arrJobs;
    currentJobs=currentJobs.filter(item=>item.id!==job.id)
    this.setState({
     arrJobs:currentJobs 
    })
  }
  /* 
    JSX => return block
    fragment
    */

  render() {
    console.log('call render: ', this.state);
    return (
      <>
        <AddComponent
        addNewJob={this.addNewJob}
        />
        
        <ChildComponent
          // name={this.state.firstName}
          // age={'23'}
          arrJobs={this.state.arrJobs}
          deleteAjob={this.deleteAjob}
        />
      </>
    );
  }
}
export default MyComponent;
