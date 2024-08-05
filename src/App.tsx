import {Navbar, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Typeahead from './component/Typeahead';


function App() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Typeahead</Navbar.Brand>
        </Container>
      </Navbar>
      <div>
        <h1>Typeahead Example</h1>
        <Typeahead />
      </div>
    </>
  );
}

export default App;
