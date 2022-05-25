import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { CircularProgress } from "@mui/material";

export default function NewJobModal(props) {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [position, setPosition] = useState("");
  const [details, setDetails] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState(10);

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="jobModal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="jobModal-title"> Create a new job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="jobModal-label">Company Name</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="jobModal-label">Company Logo URL</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            required
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="jobModal-label">Position</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="jobModal-label">
                Stake Amount (Wei)
              </Form.Label>
              <Form.Control
                min={10}
                type="number"
                placeholder=""
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="jobModal-label">Salary</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="jobModal-label">Type</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="jobModal-label">Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder=""
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <p className="jobModal-error">{error}</p>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setError("");
            if (amount < 10) {
              setError("Stake amount should be at least 10 Wei");
            } else if (
              name != "" &&
              logo != "" &&
              position != "" &&
              details != "" &&
              salary != "" &&
              type != "" &&
              amount != ""
            ) {
              props.onSave(name, logo, position, details, salary, type, amount);
            } else {
              setError("All fields are required");
            }
          }}
          style={{
            backgroundColor: "#FF5D56",
            border: "none",
            width: "80px",
            height: "40px",
          }}
        >
          {props.loading ? (
            <CircularProgress color="inherit" size={"25px"} />
          ) : (
            "Save"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
