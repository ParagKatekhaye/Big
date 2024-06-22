import { Alert, Button, Col, Container, Form, Row, Modal } from "react-bootstrap";
import { Header } from "./header";
import { useState } from "react";
import { saveStudent } from "../services/StudentService";
import './Style.css'

export function StudentRegistrationForm() {
  const [formData, setFormData] = useState({ roll: "", fname: "", lname: "", city: "", state: "", mob: "", gender: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    const namePattern = /^[A-Za-z]+$/;
    const numberPattern = /^\d+$/;

    if (!formData.roll || !numberPattern.test(formData.roll) || formData.roll.length == 10) {
      errors.roll = "Id must be  number";
    }
    if (!formData.fname || !namePattern.test(formData.fname)) {
      errors.fname = "First name must contain only letters";
    }
    if (!formData.lname || !namePattern.test(formData.lname)) {
      errors.lname = "Last name must contain only letters";
    }
    if (!formData.city || !namePattern.test(formData.city)) {
      errors.city = "City must contain only letters";
    }
    if (!formData.state || !namePattern.test(formData.state)) {
      errors.state = "State must contain only letters";
    }
    if (!formData.mob || !numberPattern.test(formData.mob) || formData.mob.length !== 10) {
      errors.mob = "Mobile number must be a 10-digit number";
    }
    if (!formData.gender) {
      errors.gender = "Gender is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const result = await saveStudent(formData);
        setIsSubmitted(true);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          setIsSubmitted(false);
        }, 1500);
        console.log(result.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div  className="bg-green">
    <Container>
      <div style={{textAlign:'center'}}>
      <Header  text="Registeration for Employee" />
      </div>

        <div >
      <Form onSubmit={handleSubmit}>
       
          <Col lg={4}>
            <Form.Group className="mb-3">
              <Form.Label  style={{ color: 'white'}} >Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Id"
                name="roll"
                value={formData.roll}
                onChange={handleChange}
                isInvalid={!!errors.roll}
              />
              <Form.Control.Feedback type="invalid">{errors.roll}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3">
              <Form.Label  style={{ color: 'white' }}>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                isInvalid={!!errors.fname}
              />
              <Form.Control.Feedback type="invalid">{errors.fname}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3">
              <Form.Label  style={{ color: 'white' }}>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                isInvalid={!!errors.lname}
              />
              <Form.Control.Feedback type="invalid">{errors.lname}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3">
              <Form.Label  style={{ color: 'white' }}>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
              />
              <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3">
              <Form.Label  style={{ color: 'white' }}>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                isInvalid={!!errors.state}
              />
              <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3">
              <Form.Label  style={{ color: 'white' }}>Mobile No</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                name="mob"
                value={formData.mob}
                onChange={handleChange}
                isInvalid={!!errors.mob}
              />
              <Form.Control.Feedback type="invalid">{errors.mob}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        

        
          <Form.Label  style={{ color: 'white' }}>Gender</Form.Label>
          <Col  style={{ color: 'white' }}>
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              value="male"
              onChange={handleChange}
              isInvalid={!!errors.gender}
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value="female"
              onChange={handleChange}
              isInvalid={!!errors.gender}
            />
            <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
          </Col>
        

       
          <Col>
            <Button variant="primary" type="submit">Register</Button>
          </Col>
        
      </Form>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Employee Registered Successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Row className="mt-3">
        <Col lg={4}>
          {isSubmitted ? <Alert variant="success">Employee Registered</Alert> : null}
        </Col>
      </Row>
    </Container>
    </div>
  );
}
