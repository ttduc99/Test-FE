import React from "react";
import {withRouter} from 'react-router-dom';
import axios from "axios";
class DetailUser extends React.Component{
    state={
        user:{}
    }
    async componentDidMount(){
        if(this.props.match&& this.props.match.params){
            let id= this.props.match.params.id
            let res= await axios.get(`https://reqres.in/api/users/${id}`)
            this.setState({
                user:res&&res.data&& res.data.data? res.data.data: {}
            })
        }
            // console.log(this.props)
    }
    handleBack=()=>{
        this.props.history.push('/listuser')
    }
     render() {
         let { user}= this.state;
         let isEmptyObj=Object.keys(user).length===0;
         return (
             <>
             <div>
               id: {this.props.match.params.id}
             </div>
             {isEmptyObj===false&& 
             <>
              <div>UserName: {user.first_name}- {user.last_name}</div>
             <div> UserMail: {user.email}</div>
             <div>
                 <img src={user.avatar}/>
             </div>
             <div>
                 <button type="button" onClick={()=>this.handleBack()}>Back</button>
             </div>
             </>
             }
            
             </>
         )
     }
}
export default withRouter(DetailUser);