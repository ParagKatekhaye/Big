import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export function NavigationBar(){
  return(
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" >
    <Container>
      <Navbar.Brand href="#home">Employee App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">

          {/* <LinkContainer to="/">
          <Nav.Link>Dashboard</Nav.Link>
          </LinkContainer> */}

          <LinkContainer to="/student-list">
          <Nav.Link>Employees List</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/students-registration">
          <Nav.Link>Register Employee Here</Nav.Link>
          </LinkContainer>
          
       
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}