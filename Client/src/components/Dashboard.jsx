import { Container } from "react-bootstrap";
import { Header } from "./header";

export function Dashboard(){
  return(
    <Container>
     <Header text="Welcome to student CRUD App"></Header>
     <p>Using this app you can add student,remove student,search specific student and update student</p>
    </Container>
  );
}