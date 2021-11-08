import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../store'

import { Navbar, Nav, Container } from "react-bootstrap";
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar bg="dark" variant="dark">
        <Container >
          <Navbar.Brand href="/">Fruits</Navbar.Brand>
          <Nav className="me-auto">
            <Link href="CrudFruits">
              <Nav.Link href="/CrudFruits">Crud Fruits</Nav.Link>
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp
