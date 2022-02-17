import React from 'react';
import { Modal, Button, Input, Form, Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
const { Option } = Select;

interface PropsStudent {
  studentList: any;
  addNewStudent: (student: any) => void; //Tao ham them moi
}
class AddStudent extends React.Component<PropsStudent> {
  state = {
    name: '',
    gender: '',
    address: '',
    formkey: 1,
    key: '',
    visible: false,
  };
  showModal = () => {
    this.setState({
      visible: true,
      key: '',
      name: '',
      gender: '',
      address: '',
      formkey: this.state.formkey + 1,
    });
  };
  // Them vao moi
  handleOk = () => {
    let newstudent = {
      key: parseInt((Math.random() * 1000).toFixed(0)),
      name: this.state.name,
      gender: this.state.gender,
      address: this.state.address,
    };
    if (
      this.state.name === '' ||
      this.state.gender === '' ||
      this.state.address === ''
    ) {
      alert('Không được để trống');
    } else {
      this.props.addNewStudent(newstudent);
      let newStudentList = [...this.props.studentList, newstudent];
      localStorage.setItem('student', JSON.stringify(newStudentList));
      this.setState({
        visible: false,
      });
    }
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  inputNameOnchange = (event: any) => {
    this.setState({
      name: event.target.value,
    });
  };
  inputGenderOnchange = (value: SelectValue) => {
    this.setState({
      gender: value,
    });
  };

  inputAddressOnchange = (event: any) => {
    this.setState({
      address: event.target.value,
    });
  };

  render() {
    let { name, address } = this.state;

    return (
      <div>
        <Button type='primary' onClick={this.showModal}>
          Thêm sinh viên
        </Button>
        <Modal
          title='Thêm sinh viên'
          visible={this.state.visible}
          okText='Lưu'
          cancelText='Hủy'
          onOk={() => this.handleOk()}
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
          <Form key={this.state.formkey} name='studentform'>
            <Form.Item
              // name='name'
              label='Họ và tên'
              // rules={[
              //   {
              //     required: true,
              //     message: 'Hãy điền tên',
              //   },
              // ]}
            >
              <Input
                value={name}
                onChange={(event) => this.inputNameOnchange(event)}
              />
            </Form.Item>
            <Form.Item
              // name='gender'
              label='Giới tính'
              // rules={[
              //   {
              //     required: true,
              //     message: 'Chọn giới tính',
              //   },
              // ]}
            >
              <Select
                // defaultValue='Nữ'
                style={{ width: 120 }}
                onChange={(value) => this.inputGenderOnchange(value)}
              >
                <Option value='Nữ'>Nữ</Option>
                <Option value='Nam'>Nam</Option>
              </Select>
            </Form.Item>
            <Form.Item
              // name='address'
              label='Địa chỉ thường trú'
              // rules={[
              //   {
              //     required: true,
              //     message: 'Hãy điền địa chỉ',
              //   },
              // ]}
            >
              <Input
                value={address}
                onChange={(event) => this.inputAddressOnchange(event)}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default AddStudent;
