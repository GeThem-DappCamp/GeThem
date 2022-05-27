import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { CircularProgress } from "@mui/material";

export default function ReferModal(props) {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="jobModal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="jobModal-title">Refer a candiate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="jobModal-label">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="jobModal-label">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="jobModal-label">Current Company</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="jobModal-label">Wallet Address</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            if (name != "" && email != "" && company != "" && address != "") {
              props.onSave(name, email, company, address);
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
            "Refer"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
