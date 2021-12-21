import React from 'react';
import './ListTodo.scss';
import AddTodo from './AddTodo';
import { toast } from 'react-toastify';
class ListTodo extends React.Component {
  state = {
    listTodos: [
      { id: '1', title: 'Doing homework' },
      { id: '2', title: 'Learn E' },
      { id: '3', title: 'Run' },
    ],
    editTodo:{}, //obj nay de reset khi edit
  };
  addNewTodo=(todo)=>{
      this.setState({
          listTodos:[...this.state.listTodos,todo]
      })
      toast.success('Thêm thành công ')
  }
  handlerDeleteTodo=(todo)=>{
    let currenTodos=this.state.listTodos;
    currenTodos=currenTodos.filter(item=>item.id!==todo.id)
    this.setState({
      listTodos:currenTodos
    })
    toast.success('Xóa thành công')
  }
  handlerEditTodo=(todo)=>{
    let{editTodo,listTodos}=this.state;
    let isEmptyObj=Object.keys(editTodo).length===0;
    if(isEmptyObj===false&&editTodo.id===todo.id){
      let listTodocopy=[...listTodos];
      let objIndex=listTodocopy.findIndex(item=>item.id===todo.id);
      listTodocopy[objIndex].title=editTodo.title
      this.setState({
        listTodos:listTodocopy,
        editTodo:{}
      })
      toast.success('Lưu thành công')
      return;
    }
    this.setState({
      editTodo:todo
    })
  }
  handleOnchangeEdit=(event)=>{
    let editTodocopy={...this.state.editTodo}
    editTodocopy.title=event.target.value
    this.setState({
      editTodo:editTodocopy
    })
  }
  render() {
    let { listTodos ,editTodo} = this.state;
    let isEmptyObj=Object.keys(editTodo).length===0;
    
    return (
      <>
          <p>Tien Trieu</p>
      <div className='list-todo-container'>
       <AddTodo addNewTodo={this.addNewTodo}/>
        <div className='list-todo-content'>
          {listTodos &&
            listTodos.length > 0 &&
            listTodos.map((item, index) => {
              return (
                <div className='todo-child' key={item.id}>
                  {isEmptyObj===true ?
                  <span> {index+1}-{item.title} </span>
                  :
                  <>
                  {editTodo.id===item.id?
                  <span>
                    {index+1}-<input value={editTodo.title}
                    onChange={(event)=>this.handleOnchangeEdit(event)}/>
                  </span>
                  :
                  <span> {index+1}-{item.title} </span>
                  }     
                  </>
            }
                  <button className='edit'
                  onClick={()=>this.handlerEditTodo(item)}
                  >
                    {isEmptyObj===false&&editTodo.id===item.id?
                    'Save':'Edit'
                    }
                  </button>
                  <button className='delete'
                  onClick={()=>this.handlerDeleteTodo(item)}
                  > Delete</button>
                </div>
              );
            })}
        </div>
      </div>
      </>
    );
  }
}
export default ListTodo;
