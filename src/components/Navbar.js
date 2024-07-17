import React from 'react'
import { Link } from "react-router-dom";
import nexlogo from  './nexlogo.png'
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">
            <img src={nexlogo} alt="NextNews Logo" style={{ height: '40px', width:'auto',  marginRight: '10px' }} /> {/* Adjust the height as needed */}
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>

              <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>

              <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>

              <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>

              <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>

              <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
