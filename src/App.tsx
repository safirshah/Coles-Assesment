import {Navbar, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Typeahead from './component/Typeahead';


function App() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#">Online Market</Navbar.Brand>
        </Container>
      </Navbar>
      <div className='container'>
        <h3 className='stext'>Online Market Place</h3>
        <Typeahead />
      </div>
    </>
  );
}

export default App;
