import React from 'react';
import { toast } from 'react-toastify';
class AddTodo extends React.Component {
  state = {
    title: '',
  };
  handleOnchangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };
  handleAddTodo=()=>{
      if(!this.state.title){
        //   alert('missing title')
        toast.error('Hãy điền công việc')
          return;
      }
      let todo={
          id: Math.floor(Math.random()*10000),
          title: this.state.title
      }
      this.props.addNewTodo(todo);
      this.setState({
          title:''
      })
  }
  render() {
    let { title } = this.state;
    return (
      <div className='add-todo'>
        <input
          type='text'
          value={title}
          onChange={(event) => this.handleOnchangeTitle(event)}
        />
        <button type='text' className='add'
        onClick={()=> this.handleAddTodo()}
        >
          Add
        </button>
      </div>
    );
  }
}
export default AddTodo;
