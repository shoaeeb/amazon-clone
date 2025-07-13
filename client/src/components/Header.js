import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="warning" variant="light" expand="lg" collapseOnSelect style={{ backgroundColor: '#232F3E' }}>
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ color: 'white', fontWeight: 'bold' }}>
            <i className="fab fa-amazon"></i> Amazon Clone
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart" style={{ color: 'white' }}>
                <i className="fas fa-shopping-cart"></i> Cart
                {cartItems.length > 0 && (
                  <span className="badge bg-danger ms-1">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                )}
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.user?.name || userInfo.name} id="username" style={{ color: 'white' }}>
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login" style={{ color: 'white' }}>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
