import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

export default function Navbar() {

  const navigate = useNavigate();

  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);

  }, [location])

  function handlelogout() {
    localStorage.removeItem('token')
    navigate('/login')

  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#3385D6"}}>
        <div className="container-fluid" >
          <Link className="navbar-brand boldText" to="/">Notebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""} boldText`} to="/" >Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""} boldText`} to="/about"  >About</Link>
              </li>


            </ul>

            {!localStorage.getItem('token') ?

              <form className="d-flex" role="search">
                <Link className="btn btn-light btn-sm mx-2 boldText" to="/login" role="button" >Log In</Link>
                <Link className="btn btn-light btn-sm mx-1 boldText" to="/signup" role="button" >Sign Up</Link>
              </form> :
              <button className="btn btn-light btn-sm mx-2 boldText" onClick={handlelogout} >Log Out</button>

            }

          </div>
        </div>
      </nav>
    </div>
  )
}
