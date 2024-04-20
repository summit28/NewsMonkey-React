import React, { Component } from 'react'
import { Link } from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">NewsMonkey</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <li className="nav-Link" aria-current="page" to="/">Home</li>
                </li>
                <li className="nav-item"><Link className="nav-Link" to="/business">Business</Link></li>

                <li className="nav-item"><Link className="nav-Link" to="/entertainment">Entertainment</Link></li>

                <li className="nav-item"><Link className="nav-Link" to="/health">Health</Link></li>

                <li className="nav-item"><Link className="nav-Link" to="/science">Science</Link></li>

                <li className="nav-item"><Link className="nav-Link" to="/sports">Sports</Link></li>

                <li className="nav-item"><Link className="nav-Link" to="/technology">Technology</Link></li>
              </ul>
            </div>
          </div>
        </nav>

      </div>
    )
  }
}

export default Navbar
