"use client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { use, useState } from "react";
import { setConfig } from "next/config";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { useRouter } from 'next/router';

interface IProps {
  showModelCreate: boolean;
  setShowModelCreate: (value: boolean) => void;
}
function CreateModel(props: IProps) {
  const { showModelCreate, setShowModelCreate } = props;
  const [ten, setTen] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tel, setTel] = useState<string>("");
//   const [content, setContent]=useState<string>("");
  const handleSubmit = () => {
    if(!ten || !email || !tel){
        toast.error("Tất cả các trường đều phải được điền")
        return;
      }
    
      // Kiểm tra định dạng email
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      if (!emailRegex.test(email)) {
        toast.error("Email không hợp lệ")
        return;
      }
    
      // Kiểm tra định dạng tel
      const telRegex = /^[0-9]{1,4}-[0-9]{1,4}-[0-9]{1,4}$/;
      if (!telRegex.test(tel) || tel.length > 14) {
        toast.error("Số điện thoại không hợp lệ")
        return;
      }
    
    fetch("http://127.0.0.1:8000/api/nhanvien/add-nhanvien", {
      headers: {
        Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZmY0Y2JkNmNkYmZjYTVlYjM2YzgyYmZlNzA2MGUyMzRjOTU3MTM2ODgyZTBmYjQ0YTg0NzlhMjU5ZTdmNzMzMTU2MzQ3ZDg5ZDZkMzlhMTMiLCJpYXQiOjE2OTQ3NjQ4NTQuMTIwNDM3LCJuYmYiOjE2OTQ3NjQ4NTQuMTIwNDQxLCJleHAiOjE3MjYzODcyNTQuMTEwOTMsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Ldxw3AXLjJpYFq_HQ2IaXe1DgUeq8r3WkDE4wyBXXzpJqXCJYhiuM8JJTYE450GayeWWdyCsYpQv4HREJ4wLDw6FxTFVtibI_5jLrZvOb_i3S085SDFPi-AapUs8lYJmIXM2_c8BSzHA8sxZi8OjPe88J9SB5YDNVDetkB5Cc-iQdroMVUTJDGR10AVI7jYTItBKRsms5zkrI4J0_1d4U6ixYn0ZZJxpKG3oqaxUZNWUiG6AXKROObRqxrbv7usdow899SEHDN2DYAKgVk3CpNIsFMxHtizUEVtMMMbek7m4qfelIxzjhJLAl5fpet7R5tmDnIjMMp_S7IlKY5QSQPu1QF3fDs2AkCEKTfpSNaXEbyyUpjQ8lRRTnpBomsCWchYGaHK8ilKmU5rKuYN0O8-I9EDqmt3LM_3xCsiN_ynFtG6EsxcotgBaw0QZG7waED30pHDJmgSdtAwaKf-Sbdac49eu864dXEBTgq27EH5qWgQZqjdqanVtv9cLRL4AfJOGRhaGzXq9cUpV08M877QHltUksswoG4KUoHz2UeP8UB_QdtupkdN9BLtm99raC19A59aE8fw7uAilgKq_6gO5rXqBQn9dodzT2hZ62SBm4Ujmvvkk1ASJmdUrQ2bgFPlhMGfQKANEbk2vfcS0H1jeQtKApHhyZWXvdEUP0tQ"}`, // Thay 'yourToken' bằng token thực tế của bạn
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ ten, email, tel }),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res){
            toast.success("create new nhân vien success");
            handleCloseModel();
            mutate("http://127.0.0.1:8000/api/nhanvien")

        }
        
      });
  };
  const handleCloseModel = () => {
    setTel("");
    setEmail("");
    setTen("");
    setShowModelCreate(false);
  };
  return (
    <>
      <Modal
        show={showModelCreate}
        onHide={() => handleCloseModel()}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                value={ten}
                onChange={(e) => setTen(e.target.value)}
                placeholder="tên"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tel</Form.Label>
              <Form.Control
                type="text"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                placeholder="tel"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModel()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
          Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModel; 
