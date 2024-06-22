
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import { Dashboard } from './components/Dashboard';
import { StudentList } from './components/StudentsList';
import { StudentRegistrationForm } from './components/StudentRegistrationForm';
import { StudentEditForm } from './components/StudentEditForm';

function App() {
  return (
    
   <BrowserRouter>
   <NavigationBar></NavigationBar>
   <Routes>
    <Route path="/" element={<Dashboard/>}></Route>
   
    <Route path="/student-list" element={<StudentList/>}></Route>

    <Route path="/students-registration" element={<StudentRegistrationForm/>}></Route>

    <Route path="/edit/:roll" element={<StudentEditForm/>}></Route>
   </Routes>

   </BrowserRouter>
  );
}

export default App;
