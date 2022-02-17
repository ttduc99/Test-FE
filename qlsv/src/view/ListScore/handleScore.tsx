import React from 'react';
import { Button, Table, Modal, Input, Form } from 'antd';
import {withRouter,RouteComponentProps, } from 'react-router-dom';
interface StudentScore{
    key:number|string;
    subjectName:string;
    score:string|number;
}
interface ScoreState {
    scoreList: StudentScore[];
    Score: StudentScore;
    isEdit: boolean;
    isAdd: boolean;
    formkeyscore: number;
    autokey:number;
  }
interface ScoreProps extends RouteComponentProps<{id:string}>{
    studentList:any;
    loadScoreList: (studentscore: any) => void;
}
const listSubject:StudentScore[]=[{key:1,subjectName:'Toan',score:''},{key:2,subjectName:'Van',score:''},{key:3,subjectName:'Anh',score:''}]

export default class HanldeScore extends React.Component<ScoreProps,ScoreState>{
    state: ScoreState = {
        scoreList: listSubject,
        Score: { key:'',subjectName:'',score:''},
        isEdit: false,
        isAdd: false,
        formkeyscore: 1,
        autokey:0
      };

getData=()=>{
  let name='';
  let studentList =[...JSON.parse(localStorage.getItem('student') || '[]')];
  studentList.map((item,index)=>{
    if(item.key==this.props.match.params.id){
      name=item.name
    }
  })
  return name
}
handleAddOk=()=>{
let newScore={
  key:this.state.autokey+1,
  subjectName:this.state.Score.subjectName,
  score:this.state.Score.score, 
}
this.setState({
  Score:newScore,
  isAdd:false,
  scoreList:[...this.state.scoreList,newScore],
  formkeyscore:this.state.formkeyscore+1,
  autokey:this.state.autokey+1,
}) 
console.log(this.state.Score.key)
}
handleCancel=()=>{
  this.setState({
    isAdd:false,
    isEdit:false
  })
}
handleEdit=(studentScore:StudentScore)=>{
  this.setState({
    isEdit:true,
    Score:{...studentScore}
  })

}
handleEditOk=()=>{

}
openModal=()=>{
  this.setState({
    isAdd:true,
  })
}

    render(){
      
        const columns = [
            {
              title: 'Môn học',
              dataIndex: 'subjectName',
              key: 'subjectName',
            },
            {
              title: 'Điểm',
              dataIndex: 'score',
              key: 'score',
            },
            {
              title: '',
              key: 'action',
              render: (studentScore: StudentScore) => {
                return (
                  <>
                    <Button
                      style={{ margin: 20 }}
                      onClick={() => this.handleEdit(studentScore)}
                    >
                      Sửa
                    </Button>
                    <Button >
                      Xóa
                    </Button>
                  </>
                );
              },
            },
          ];
          
        return(
            <> 
              <div style={{margin:20}}>Điểm của học sinh: {this.getData()}</div>
              <Table dataSource={this.state.scoreList} columns={columns} />
              <Button style={{margin:20}} onClick={()=>this.openModal()}>Thêm mới</Button>
              <Modal
          title='Thêm điểm sinh viên'
          visible={this.state.isAdd}
          okText='Lưu'
          cancelText='Hủy'
          onOk={() => this.handleAddOk()}
          onCancel={() => this.handleCancel()}
          // footer={[
          //   <>
          //     <Button
          //       form='studentform'
          //       key='submit'
          //       htmlType='submit'
          //       onClick={() => this.handleOk()}
          //     >
          //       Submit
          //     </Button>
          //     <Button onClick={() => this.handleCancel()}>Hủy</Button>
          //   </>,
          // ]}
        >
          <Form key={this.state.formkeyscore} name='studentform'>
            <Form.Item label="Tên môn học">
              <Input
               onChange={(e: any) => {
                let addNew = { ...this.state.Score };
                addNew.subjectName = e.target.value;
                this.setState({
                  Score: addNew,
                });
              }}
              />
            </Form.Item>
            <Form.Item label="Điểm môn học">
            <Input
               onChange={(e: any) => {
                let addNew = { ...this.state.Score};
                addNew.score = e.target.value;
                this.setState({
                  Score: addNew,
                });
              }}
              />
            </Form.Item>
           
          </Form>
          </Modal>

          <Modal
          title='Sửa điểm sinh viên'
          visible={this.state.isEdit}
          okText='Lưu'
          cancelText='Hủy'
          onOk={() => this.handleEditOk()}
          onCancel={() => this.handleCancel()}
        >
          <Form name='ss'>
            <Form.Item label="Tên môn học">
              <Input
              value={this.state.Score.subjectName}
               onChange={(e: any) => {
                let editScore = { ...this.state.Score };
                editScore.subjectName = e.target.value;
                this.setState({
                  Score: editScore,
                });
              }}
              />
            </Form.Item>
            <Form.Item label="Điểm môn học">
            <Input
                value={this.state.Score.score}

               onChange={(e: any) => {
                let editScore = { ...this.state.Score};
                editScore.score = e.target.value;
                this.setState({
                  Score: editScore,
                });
              }}
              />
            </Form.Item>
           
          </Form>
          </Modal>
            </>
        )
    }



}

