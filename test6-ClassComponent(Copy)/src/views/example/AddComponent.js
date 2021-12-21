import React from 'react';

class AddComponent extends React.Component {
  state = {
    titleJob: '',
    salary: '',
  };
  handleChangesalary = (event) => {
    this.setState({
      salary: event.target.value,
    });
  };
  handleChangetitleJob = (event) => {
    this.setState({
      name: event.target.value,
      titleJob: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault()
    if(!this.state.titleJob||!this.state.salary){
        alert('Missing required params')
        return;
    }
    console.log('>>> check data input: ', this.state);
    // alert('ducday');
    this.props.addNewJob(
        {
            id: Math.floor(Math.random()*1001),
            title: this.state.titleJob,
            salary: this.state.salary
        }
    )
    this.setState({
        titleJob:'',
        salary:''
    })
  };
  render() {
    return (
        <>
      <form action=''>
        <label htmlFor='fname' />Job's title:<label /><br />
        <input
          type='text'
          value={this.state.titleJob}
          onChange={(event) => this.handleChangetitleJob(event)}
        />
        <br />
        <label htmlFor='lname' />Salary:<label /><br />
        <input
          type='text'
          value={this.state.salary}
          onChange={(event) => this.handleChangesalary(event)}
        />
        <br />
        <br />
        <input
          type='submit'
          value='Submit'
          onClick={(event) => this.handleSubmit(event)}
        />
      </form>
    
      </>
    );
  }
}
export default AddComponent;
