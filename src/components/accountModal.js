import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { CircularProgress } from "@mui/material";

export default function AccountModal(props) {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    setName(props.current_name);
    setEmail(props.current_email);
  }, [props.current_name, props.current_email]);

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="jobModal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="jobModal-title">Edit Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="jobModal-label"> Address</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={props.address}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="jobModal-label"> Name</Form.Label>
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
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        {props.showCompanyField ? (
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="jobModal-label"> Current Company</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </Form.Group>
        ) : null}

        <Form.Group>
          <p className="jobModal-error">{error}</p>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onSave(name, email, company);
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
