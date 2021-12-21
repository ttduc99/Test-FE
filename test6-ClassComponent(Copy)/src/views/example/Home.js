import React from "react";
import { withRouter } from "react-router";
import Color from "../HOC/Color";
import {connect} from 'react-redux';
class Home extends React.Component{
    componentDidMount(){
        // setTimeout(()=>{
        //     this.props.history.push('/todo');
        // },3000)
    }
    //HOC: higher order component
    handleDeleteUser=(user)=>{
        this.props.deleteUserRedux(user)
    }
    handleAddUser=()=>{
        this.props.addUserRedux()
    }
    render() {
        console.log(this.props.dataRedux)
        let listUser=this.props.dataRedux;
        return (
            <>
            <div>
                <p>Tien Duc day</p>
            </div>
            <div>
                {listUser&&listUser.length>0 &&
                listUser.map((item,index)=>{
                    return (
                        <div key={item.id}>
                            {index+1}-{item.name} &nbsp;<button onClick={()=>this.handleDeleteUser(item)}>x</button>
        

                        </div>
                    )
                })
                 }
            </div>
            <button onClick={()=>this.handleAddUser()}>Thêm mới</button>
            </>
        )
    }
}
// export default withRouter(Home) ;
const mapStateToProps=(state)=>{
    return {dataRedux:state.users}
}
const mapDispatchToprops =(dispatch)=>{
    return{
        deleteUserRedux:(userDelete)=>dispatch({type:'DELETE_USER',payload:userDelete}),
        addUserRedux:()=>dispatch({type:'CREATE_USER'}),
    }
}
export default connect(mapStateToProps,mapDispatchToprops)(Color(Home)) ;