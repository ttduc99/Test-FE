import React from 'react';
import { Button, Table, Modal, Input, Form } from 'antd';

interface PropsScore {
  studentList: any;
}
interface StudentScore {
  key: string;
  name: string;
  math: string;
  english: string;
  literature: string;
}
interface ScoreState {
  scoreList: StudentScore[];
  Score: StudentScore;
  isEdit: boolean;
  isAdd: boolean;
  formkeyscore: number;
}
export default class handleScore extends React.Component<
  PropsScore,
  ScoreState
> {
  componentDidMount() {
    let scoreList = JSON.parse(localStorage.getItem('scoreStudent') || '[]');
    if(scoreList.length===0&&this.state.scoreList.length===0)
    {
      this.getListStudent()//Lay danh sach sinh vien
    }
    if(scoreList.length>0){
      this.updateList(); // Luu localStorage
    }
    
  }

  state: ScoreState = {
    scoreList: [],
    Score: { key: '', name: '', math: '', english: '', literature: '' },
    isEdit: false,
    isAdd: false,
    formkeyscore: 1,
  };

  hanleAddScore = (studentScore: StudentScore) => {
    this.setState({
      isAdd: true,
      Score: { ...studentScore },
    });
  };

  hanleEditScore = (studentScore: StudentScore) => {
    if (
      studentScore.math === '' &&
      studentScore.english === '' &&
      studentScore.literature === ''
    ) {
      alert('Hãy nhập điểm');
      return;
    } else {
      this.setState({
        isEdit: true,
        Score: { ...studentScore },
      });
    }
  };

  // Xoa diem
  handleDeleScore = (studentScore: StudentScore) => {
        let currentList = [...this.state.scoreList];
        currentList.map((score, index) => {
          if (currentList[index].key === studentScore.key) {
            studentScore.math =
              studentScore.english =
              studentScore.literature =
                '';
              currentList[index]={...studentScore}
          }
        });
        this.setState({
          scoreList: currentList,
        });
        // console.log(this.state.scoreList);
        localStorage.setItem('scoreStudent', JSON.stringify(currentList));
  };

  // Thay doi state khi them hoac sua diem
  changeData = () => {
    let currentList = [...this.state.scoreList];
    currentList.map((student, index) => {
      if (student.key === this.state.Score.key) {
        currentList[index] = this.state.Score;
      }
    });
    this.setState({
      isAdd: false,
      isEdit: false,
      formkeyscore: this.state.formkeyscore + 1, //reset form them moi
      scoreList: currentList,
    });
    // console.log(this.state.Score);
    localStorage.setItem('scoreStudent', JSON.stringify(currentList));
  };
  getListStudent=()=>{
    let listStudent:StudentScore[]=[...this.props.studentList];
    listStudent.map((item,index)=>{
      item.math=item.english=item.literature=''
    })
    this.setState({
      scoreList:listStudent
    })
    localStorage.setItem('scoreStudent', JSON.stringify(listStudent));
  }
  // Khi them sua xoa sinh vien
  updateList = () => {
    let scoreList = JSON.parse(localStorage.getItem('scoreStudent') || '[]');
    let scoreLNew = [...scoreList];
    let updateL: StudentScore[] = [...this.props.studentList];
    let updateScore: StudentScore[] = [];
    //Luu lai cac sinh vien chua bi thay doi
    scoreLNew.map((item, index) => {
      for (let i = 0; i < updateL.length; i++) {
        if (scoreLNew[index].key === updateL[i].key) {
          scoreLNew[index].name = updateL[i].name;
          updateScore = [...updateScore, scoreLNew[index]];
        }
      }
    });
    //update cac sinh vien da sua xoa
    if (updateScore.length < updateL.length) {
      updateL.map((item, index) => {
        for (let i = 0; i < updateScore.length; i++) {
          if (updateL[index].key === updateScore[i].key) {
            updateScore[i].name = updateL[index].name;
            updateL.splice(index, 1);
          }
        }
      });
      updateL.map((item)=>{
        item.math=item.english=item.literature=''
      })
      updateScore = [...updateScore, ...updateL];
    }
    scoreLNew = updateScore;
    // console.log(scoreLNew)
    localStorage.setItem('scoreStudent', JSON.stringify(scoreLNew));
    this.setState({
      scoreList: scoreLNew,
    });
  };

  render() {
    let { scoreList } = this.state;
    const columns = [
      {
        title: 'Mã sinh viên',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: 'Họ và tên',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Toán',
        dataIndex: 'math',
        key: 'math',
      },
      {
        title: 'Anh',
        dataIndex: 'english',
        key: 'english',
      },
      {
        title: 'Ngữ văn',
        dataIndex: 'literature',
        key: 'literature',
      },
      {
        title: '',
        key: 'action',
        render: (studentScore: StudentScore) => {
          return (
            <>
              <Button onClick={() => this.hanleAddScore(studentScore)}>
                Thêm mới
              </Button>
              <Button
                style={{ margin: 20 }}
                // onClick={() => this.handleEditStudent(student)}
                onClick={() => this.hanleEditScore(studentScore)}
              >
                Sửa
              </Button>
              <Button onClick={() => this.handleDeleScore(studentScore)}>
                Xóa
              </Button>
            </>
          );
        },
      },
    ];
    return (
      <>
        <Table dataSource={scoreList} columns={columns} />
        <Modal
          title='Thêm điểm mới'
          visible={this.state.isAdd}
          onCancel={() => {
            this.setState({ isAdd: false });
          }}
          onOk={() => this.changeData()}
        >
          <Form key={this.state.formkeyscore}>
            <Input
              placeholder='Nhập điểm toán'
              onChange={(e: any) => {
                let newScore = this.state.Score;
                newScore.math = e.target.value;
                this.setState({
                  Score: newScore,
                });
              }}
              style={{ margin: 15 }}
            ></Input>
            <Input
              placeholder='Nhập điểm anh'
              onChange={(e: any) => {
                let newScore = this.state.Score;
                newScore.english = e.target.value;
                this.setState({
                  Score: newScore,
                });
              }}
              style={{ margin: 15 }}
            ></Input>
            <Input
              placeholder='Nhập điểm văn'
              onChange={(e: any) => {
                let newScore = this.state.Score;
                newScore.literature = e.target.value;
                this.setState({
                  Score: newScore,
                });
              }}
              style={{ margin: 15 }}
            ></Input>
          </Form>
        </Modal>
        <Modal
          title='Sửa điểm'
          visible={this.state.isEdit}
          onCancel={() => {
            this.setState({ isEdit: false });
          }}
          onOk={() => this.changeData()}
        >
          <Input
            placeholder='Nhập điểm toán'
            value={this.state.Score?.math}
            style={{ margin: 15 }}
            onChange={(e: any) => {
              let newScore = this.state.Score;
              newScore.math = e.target.value;
              this.setState({
                Score: newScore,
              });
            }}
          ></Input>
          <Input
            placeholder='Nhập điểm anh'
            value={this.state.Score?.english}
            style={{ margin: 15 }}
            onChange={(e: any) => {
              let newScore = this.state.Score;
              newScore.english = e.target.value;
              this.setState({
                Score: newScore,
              });
            }}
          ></Input>
          <Input
            placeholder='Nhập điểm văn'
            value={this.state.Score?.literature}
            style={{ margin: 15 }}
            onChange={(e: any) => {
              let newScore = this.state.Score;
              newScore.literature = e.target.value;
              this.setState({
                Score: newScore,
              });
            }}
          ></Input>
        </Modal>
      </>
    );
  }
}
