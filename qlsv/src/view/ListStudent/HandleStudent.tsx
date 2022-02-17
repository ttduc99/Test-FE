import React from 'react';
import { Button, Table, Modal, Input, Select, Form } from 'antd';
import AddStudent from './AddStudent';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import HanldeScore from '../ListScore/handleScore';
const { Option } = Select;
export interface Student {
  key: string|number;
  name: string;
  gender: string;
  address: string;
}
interface StudentState {
  dataSource: Student[];
  editStudent: Student;
  isEditing: boolean;
  showScore: boolean;
}

export default class HandleStudent extends React.Component<{}, StudentState> {
  componentDidMount() {
    let studentList = JSON.parse(localStorage.getItem('student') || '[]');
    this.setState({
      dataSource: studentList,
    });
  }
  state: StudentState = {
    dataSource: [],
    editStudent: { key: '', name: '', gender: '', address: '' },
    isEditing: false,
    showScore: false,
  };

  handleDeleteStudent = (student: Student) => {
    //Modal xác nhận
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa?',
      onOk: () => {
        let currentStudentList = this.state.dataSource;
        currentStudentList = currentStudentList.filter(
          (item) => item.key !== student.key
        );
        this.setState({
          dataSource: currentStudentList,
        });
        localStorage.setItem('student', JSON.stringify(currentStudentList));
      },
    });
  };
  handleEditStudent = (student: Student) => {
    this.setState({
      isEditing: true,
      editStudent: { ...student },
    });
  };
  updateStudentEdit = () => {
    let currentList = [...this.state.dataSource];
    if (
      this.state.editStudent.name === '' ||
      this.state.editStudent.gender === '' ||
      this.state.editStudent.address === ''
    ) {
      alert('Không được để trống');
    } else {
      currentList.map((student, index) => {
        if (student.key === this.state.editStudent.key) {
          currentList[index] = this.state.editStudent;
        }
        return true;
      });
      console.log(currentList);
      this.setState({
        dataSource: currentList,
        isEditing: false,
      });
      localStorage.setItem('student', JSON.stringify(this.state.dataSource));
    }
  };

  render() {
    let { dataSource } = this.state;
    const columns = [
      {
        title: 'Mã sinh viên',
        dataIndex: 'key',
        key: 'key',
        render: (id: any) => <Link to={`/listdiem/${id}`}>{id}</Link>,
      },
      {
        title: 'Họ và tên',
        dataIndex: 'name',
        key: 'name',
        render: (name: any) => <Link to={`/listdiem/${name}`}>{name}</Link>,
      },
      {
        title: 'Giới tính',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '',
        key: 'action',
        render: (student: Student) => {
          return (
            <>
              <Button
                style={{ margin: 20 }}
                onClick={() => {
                  this.handleEditStudent(student);
                }}
              >
                Sửa
              </Button>
              <Button onClick={() => this.handleDeleteStudent(student)}>
                Xóa
              </Button>
            </>
          );
        },
      },
    ];
    return (
      <>
      {/* <Router>
        <Switch>
          <Route path='/listdiem/:id'>
            <HanldeScore
              // studentList={this.state.dataSource}
              loadScoreList={(studentScore: Student) => {}}
            />
          </Route>
          <Route path="/"> */}
          <h1>
           Danh sách sinh viên
        </h1>
        
          <Modal
          title='Sửa thông tin sinh viên'
          visible={this.state.isEditing}
          okText='Lưu'
          onCancel={() => {
            this.setState({
              isEditing: false,
            });
          }}
          onOk={() => {
            this.updateStudentEdit();
            // this.setState({
            //   editStudent: { key: '', name: '', gender: '', address: '' },
            // })
            // console.log(this.state.dataSource)
          }}
        >
          <Form
            name='form_edit'
            // fields={[
            //   {
            //     name: ['gender'],
            //     value: this.state.editStudent?.gender,
            //   },
            // ]}
          >
            <Form.Item>
              <Input
                value={this.state.editStudent?.name}
                style={{ margin: 15 }}
                onChange={(e: any) => {
                  let editNew = { ...this.state.editStudent };
                  editNew.name = e.target.value;
                  this.setState({
                    editStudent: editNew,
                  });
                }}
              />
            </Form.Item>

            <Form.Item>
              <Select
                style={{ width: 120, margin: 15 }}
                onChange={(value: string) => {
                  let editNew = { ...this.state.editStudent };
                  editNew.gender = value;
                  this.setState({
                    editStudent: editNew,
                  });
                }}
              >
                <Option value='Nữ'>Nữ</Option>
                <Option value='Nam'>Nam</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Input
                value={this.state.editStudent?.address}
                style={{ margin: 15 }}
                onChange={(e: any) => {
                  let editNew = { ...this.state.editStudent };
                  editNew.address = e.target.value;
                  this.setState({
                    editStudent: editNew,
                  });
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
        <Table dataSource={dataSource} columns={columns} />
        <AddStudent
          studentList={this.state.dataSource}
          addNewStudent={(student: Student) =>
            this.setState({
              dataSource: [...this.state.dataSource, student],
            })
          }
        />
          {/* </Route>
        </Switch> */}

        {/* <Button
          type='primary'
          danger
          style={{ margin: 30 }}
          onClick={() => this.setState({ showScore: !this.state.showScore })}
        >
          Danh sách điểm
        </Button>
        {this.state.showScore === true ? (
          <HandleScore studentList={this.state.dataSource} />
        ) : (
          <div></div>
        )} */}
        {/* </Router> */}
      </>
    );
  }
}
