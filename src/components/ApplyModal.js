import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { CircularProgress } from "@mui/material";

export default function ApplyModal(props) {
  const [error, setError] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [skillsets, setSkillsets] = useState("");

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="jobModal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="jobModal-title"> Apply</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="jobModal-label">Current Position</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={currentPosition}
            onChange={(e) => setCurrentPosition(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="jobModal-label">Linkedin Profile</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={linkedinProfile}
            onChange={(e) => setLinkedinProfile(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="jobModal-label">
            Years Of Experience
          </Form.Label>
          <Form.Control
            type="number"
            placeholder=""
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="jobModal-label">Skills</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={skillsets}
            onChange={(e) => setSkillsets(e.target.value)}
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
            if (
              yearsOfExperience != "" &&
              skillsets != "" &&
              currentPosition != "" &&
              linkedinProfile != ""
            ) {
              props.onSave(
                yearsOfExperience,
                skillsets,
                currentPosition,
                linkedinProfile
              );
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
            "Apply"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
