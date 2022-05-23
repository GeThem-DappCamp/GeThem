import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";

export default function NewJobModal(props) {
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
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="jobModal-label">Company Logo URL</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="jobModal-label">Position</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="jobModal-label">Salary</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="jobModal-label">Type</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          // onClick={}
          style={{ backgroundColor: "#FF5D56", border: "none" }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
