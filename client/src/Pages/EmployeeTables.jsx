import React, { useState } from "react";
import { Button, Form, Input, message, Modal, Space, Table } from "antd";
import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";
import ModalC from "../components/Modal";

function EmployeeTables() {
  const [columns, setColumns] = useState();
  const [data, setData] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [reRender, setreRender] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState();

  const { form } = Form.useForm();

  useEffect(() => {
    getTableData();
  }, [reRender]);

  useEffect(() => {
    console.log(editingEmployee, "yoyo");
  }, [editingEmployee]);

  const getSingleEmployee = (id) => {
    const { key, name, position, address, email } = id;

    const newObjd = { key, name, position, address, email };
    // console.log(newObjd, "dynamic");

    setEditingEmployee(newObjd);
    // setEditingEmployee(id.slice(2, id.length + 1));
    // const url = `http://localhost:5000/api/employees/${id}`;

    // const result = await axios.get(url);
    // const employee = result.data.employee;
    // setEditingEmployee({
    //   name: employee.name,
    //   position: employee.position,
    //   address: employee.address,
    //   email: employee.email,
    // });
  };
  // const initialValue = {
  //   name: "prabal",
  //   position: "dev",
  //   address: "baneshwor",
  //   email: "p@gmail.com",
  // };
  // const initialValue = {
  //   name: "Prabal Thulung Rai",
  //   position: "Developer",
  //   address: "Ban3eswhor",
  //   email: "prabalrai17@gmail.com",
  // };
  const addNewEmployee = (e) => {
    const url = "http://localhost:5000/api/employees";

    const data = {
      name: e.name,
      position: e.position,
      address: e.address,
      email: e.email,
    };
    return axios
      .post(url, data)
      .then(() => {
        message.info("Added Successfully!");
        setreRender(!reRender);
        setAddModal(false);
        form.resetFields();
      })
      .catch((err) => {
        console.log(err);
        message.warning("something went wrong");
      });
  };

  const deleteRecord = (id) => {
    const url = `http://localhost:5000/api/employees/${id}`;

    return axios
      .delete(url)
      .then(() => {
        setreRender(!reRender);
        message.info("Deleted Successfully!");
      })
      .catch(() => message.warning("something went wrong"));
  };

  const getTableData = () => {
    const url = "http://localhost:5000/api/employees";

    return axios
      .get(url)
      .then(function (response) {
        const add = {
          title: "ACTIONS",
          key: "action",
          render: (_, record) => (
            <Space size="middle">
              <Button
                type="primary"
                onClick={() => {
                  getSingleEmployee(record);
                  setEditModal(true);
                }}
              >
                Edit
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => {
                  setModalVisible(true);
                  setDeleteId(record.key);
                }}
              >
                Delete
              </Button>
            </Space>
          ),
        };

        // handle success
        const data = response.data.employees;

        const columns = Object.keys(data[0]).map((key) => ({
          title: key.toString().toUpperCase(),
          dataIndex: key,
          key: key.toString().toUpperCase(),
        }));
        setColumns(columns.slice(1, columns.length - 1).concat(add));

        const tableData = data.map((item) => ({
          key: item._id,
          name: item.name,
          position: item.position,
          address: item.address,
          email: item.email,
        }));
        setData(tableData);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
  const onFinish = (values) => {
    addNewEmployee(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onEdit = () => {
    const url = `http://localhost:5000/api/employees/${editingEmployee?.key}`;

    const data = {
      name: editingEmployee.name,
      position: editingEmployee.position,
      address: editingEmployee.address,
      email: editingEmployee.email,
    };

    console.log(data);
    return axios
      .put(url, data)
      .then(() => {
        message.info("Edited Successfully!");
        setreRender(!reRender);
        setEditModal(false);
      })
      .catch((err) => {
        console.log(err);
        message.warning("something went wrong");
      });
  };

  return (
    <>
      <div>
        <div
          style={{
            textAlign: "center",
            fontSize: 25,
            fontWeight: "bold",
            padding: 40,
          }}
        >
          Employees of Luniva Tech Pvt.Ltd
        </div>
        <TableDiv>
          <Button
            type="primary"
            style={{ margin: "25px 0px" }}
            onClick={() => setAddModal(true)}
          >
            Add New Employee
          </Button>
          <Table size="small" columns={columns} dataSource={data} />
        </TableDiv>
        <ModalC
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          deleteRecord={deleteRecord}
          setDeleteId={setDeleteId}
          deleteId={deleteId}
        />
        <Modal
          title={"Add New Employee"}
          onCancel={() => {
            setEditingEmployee();
            setAddModal(false);
          }}
          open={addModal}
          footer={false}
        >
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Position"
              name="position"
              rules={[
                {
                  required: true,
                  message: "Please input position!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input Address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input Email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title={"Edit Employee"}
          onCancel={() => {
            setEditingEmployee();
            setEditModal(false);
          }}
          open={editModal}
          footer={false}
        >
          Name:
          <EditInput>
            <Input
              value={editingEmployee?.name}
              onChange={(e) => {
                setEditingEmployee((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
            />
          </EditInput>
          Position:
          <EditInput>
            <Input
              value={editingEmployee?.position}
              onChange={(e) => {
                setEditingEmployee((prev) => {
                  return { ...prev, position: e.target.value };
                });
              }}
            />
          </EditInput>
          Address:
          <EditInput>
            <Input
              value={editingEmployee?.address}
              onChange={(e) => {
                setEditingEmployee((prev) => {
                  return { ...prev, address: e.target.value };
                });
              }}
            />
          </EditInput>
          Email
          <EditInput>
            <Input
              value={editingEmployee?.email}
              onChange={(e) => {
                setEditingEmployee((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
            />
          </EditInput>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{ width: "100%", marginTop: "10px", alignSelf: "center" }}
              type="primary"
              onClick={() => onEdit()}
            >
              Edit
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default EmployeeTables;

const EditBtn = styled.div`
  color: white;
  background-color: darkblue;
  padding: 4px 8px 4px 8px;
  border-radius: 5px;

  &:hover {
    background-color: #1677ff;
  }
`;
const DeleteBtn = styled.div`
  color: white;
  background-color: darkred;
  padding: 4px 8px 4px 8px;
  border-radius: 5px;

  &:hover {
    background-color: #ff3232;
  }
`;

const TableDiv = styled.div`
  /* display: flex;
  justify-content: center; */
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  /* margin-top: 100px; */
`;
const EditInput = styled.div`
  /* display: flex;
  justify-content: center; */

  margin: 10px 0px;
`;
