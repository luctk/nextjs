"use client";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import CreateModel from "./create";
import UpdateModel from "./update";
import { useState } from "react";
interface IProps {
  nhanviens: Nhanvien[];
}

const BasicExample = (props: IProps) => {
  const { nhanviens } = props;  
  const [nhanvien, setNhanvien] = useState< Nhanvien | null>(null);
  const [showModelCreate, setShowModelCreate] = useState<boolean>(false);
  const [showModelUpdate, setShowModelUpdate] = useState<boolean>(false);
  return (
    <>
      <div className="">
        <p>Tạp mới nhân viên</p>
        <button onClick={() => setShowModelCreate(true)}>Add</button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Tel</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {nhanviens.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.ten}</td>
                <td>{item.email}</td>
                <td>{item.tel}</td>
                <td>
                  <button>View</button>
                  <button
                    className="mx-3"
                    onClick={() => {
                      setNhanvien(item);
                      setShowModelUpdate(true);
                    }}
                  >
                    Edit
                  </button>
                  <button>delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CreateModel
        showModelCreate={showModelCreate}
        setShowModelCreate={setShowModelCreate}
      />
      <UpdateModel
        showModelUpdate={showModelUpdate}
        setShowModelUpdate={setShowModelUpdate}
        nhanvien={nhanvien}
        setNhanvien={setNhanvien}
      />
    </>
  );
};

export default BasicExample;
