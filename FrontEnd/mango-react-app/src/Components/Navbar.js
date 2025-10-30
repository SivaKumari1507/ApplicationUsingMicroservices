import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import './Navbar.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';



function Navbar({ cartCount }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);




  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowModal(false);
  };

  const handleLogoutConfirm = () => {
    handleLogout();
    setShowModal(false);
  };

  return (
    <>
      <header>
        {/* <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed box-shadow mb-3"> 
         <nav
  className="navbar navbar-expand-sm fixed box-shadow mb-3"
  style={{ backgroundColor: 'rgba(16, 46, 86, 0.96)', color: 'rgba(252, 253, 255, 0.96)' }} // Indigo background with white text
> */}
     {/* <nav className="navbar navbar-expand custom-navbar fixed box-shadow"> */}
     <nav className="navbar navbar-expand-sm custom-navbar fixed box-shadow">

          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Mango-React-App</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse d-sm-inline-flex justify-content-between" id="navbarNav">
              <ul className="navbar-nav flex-grow-1">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  > Content Management
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/coupons">Coupon</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/products">Product</Link>
                    </li>

                    <li><hr className="dropdown-divider" /></li>
                  </ul>
                </li>
              </ul>

              <ul className="navbar-nav">

                {!user ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Register</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link position-relative" to="/cart">
                        <FaShoppingCart />
                        {cartCount > 0 && (
                          <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                            {cartCount}
                          </span>
                        )}
                      </Link>
                    </li>

                    <li className="nav-item">
                      <span className="nav-link">Hello {user.name}</span>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link btn btn-link" onClick={() => setShowModal(true)}>Logout</button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor: "rgba(163, 181, 166, 0.89)"
          }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div
              className="modal-content"
              style={{
                backgroundColor: "#290b5aff", // Change modal background color here
                color: "#fff" // Change text color
              }}
            >
              <div className="modal-header" style={{ borderBottom: "1px solid #4a4e69" }}>
                <h5 className="modal-title">Confirm Logout</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to logout?</p>
              </div>
              <div className="modal-footer" style={{ borderTop: "1px solid #4a4e69" }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>No</button>
                <button type="button" className="btn btn-danger" onClick={handleLogoutConfirm}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;

/* import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import './Navbar.css';
import { FaShoppingCart } from 'react-icons/fa';


function Navbar({ cartCount }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  

const handleLogout = () => {
  logout();
  // setCartCount(0); // ✅ Reset cart count
  navigate('/login');
};

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed box-shadow mb-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Mango-React-App</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse d-sm-inline-flex justify-content-between" id="navbarNav">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                > Content Management
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/coupons">Coupon</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/products">Product</Link>
                  </li>

                  <li><hr className="dropdown-divider" /></li>
                </ul>
              </li>
            </ul>


            <ul className="navbar-nav">

              {!user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              ) : (
                <>
                   <li className="nav-item">
                <Link className="nav-link position-relative" to="/cart">
                  <FaShoppingCart />
                  {cartCount > 0 && (
                    <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
                  <li className="nav-item">
                    <span className="nav-link">Hello {user.name}</span>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar; */

