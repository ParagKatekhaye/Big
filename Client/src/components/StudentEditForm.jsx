import { Alert, Button, Col, Container, Form, Row, Modal } from "react-bootstrap";
import { Header } from "./header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStudentByRoll, updateStudent } from "../services/StudentService";
import './Style.css'

export function StudentEditForm() {

  const params = useParams();
  const [formData,setFormData]= useState({roll:"",fname:"",lname:"",city:"",state:"",mob:"",gender:""});
  const [isSubmitted,setIsSubmitted]=useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const validateForm = () => {
    let errors = {};
    const namePattern = /^[A-Za-z]+$/;
    const numberPattern = /^\d+$/;

    if (!formData.roll || !numberPattern.test(formData.roll) || formData.roll.length !== 10) {
      errors.roll = "Id must be a 10-digit number";
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

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const result = await updateStudent(formData, params.roll);
        console.log(result);
        setIsSubmitted(true);
        setShowModal(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(formErrors);
    }
  }

  const populateStudentState=async()=>{
    try {
      const result =await fetchStudentByRoll(params.roll);
      setFormData(result.students);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    populateStudentState();
  },[])

  return (
    <div  className="bg-green">
    <Container style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '10px' }}>
      <div style={{textAlign:'center'}}>
      <Header text="Update Employee here"></Header>
      </div>
      {formData ? 
        <Form onSubmit={handleSubmit}>
         
            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label>Id</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.roll} 
                  placeholder="Enter id" 
                  name="roll" 
                  onChange={handleChange} 
                  isInvalid={!!errors.roll}
                />
                <Form.Control.Feedback type="invalid">{errors.roll}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.fname} 
                  placeholder="Enter first name" 
                  name="fname" 
                  onChange={handleChange} 
                  isInvalid={!!errors.fname}
                />
                <Form.Control.Feedback type="invalid">{errors.fname}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.lname} 
                  placeholder="Enter last name" 
                  name="lname" 
                  onChange={handleChange} 
                  isInvalid={!!errors.lname}
                />
                <Form.Control.Feedback type="invalid">{errors.lname}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.city} 
                  placeholder="Enter city" 
                  name="city" 
                  onChange={handleChange} 
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.state} 
                  placeholder="Enter state" 
                  name="state" 
                  onChange={handleChange} 
                  isInvalid={!!errors.state}
                />
                <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label>Mobile No</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.mob} 
                  placeholder="Enter mobile no" 
                  name="mob" 
                  onChange={handleChange} 
                  isInvalid={!!errors.mob}
                />
                <Form.Control.Feedback type="invalid">{errors.mob}</Form.Control.Feedback>
              </Form.Group>
            </Col>
        

         
            <Col>
              <Form.Label>Gender</Form.Label>
              <Form.Check
                type="radio"
                label="Male"
                name="gender"
                value="male"
                onChange={handleChange}
                checked={formData.gender==="male"}
                isInvalid={!!errors.gender}
              />
              <Form.Check
                type="radio"
                label="Female"
                name="gender"
                value="female"
                onChange={handleChange}
                checked={formData.gender==="female"}
                isInvalid={!!errors.gender}
              />
              <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
            </Col>
          
          
        
            <Col lg={3}>
              <Button variant="primary" type="submit">Update</Button>
            </Col>
        
        </Form> 
      : <p>No data found for given roll no</p>}
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Employee's data updated successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* <Row className="mt-3">
        <Col lg={4}>
          {isSubmitted && !showModal ? <Alert variant="success">Student Updated </Alert> : null}
        </Col>
      </Row> */}
    </Container>
    </div>
  );
}
