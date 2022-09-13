import './App.css';
import {Nav, Navbar} from "react-bootstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import Upload from "./Upload";
import React from "react";

function App() {
  return (
      <BrowserRouter>
          <Navbar bg="dark" variant="dark">
              <Navbar.Brand className="Navigation">Employee Salary Manager</Navbar.Brand>
              <Nav className="me-auto">
                  <Nav.Link href="/">Dashboard</Nav.Link>
                  <Nav.Link href="/Upload">Upload</Nav.Link>
              </Nav>
          </Navbar>
          <Routes>
              <Route
                  path="/"
                  exact
                  element={<Dashboard/>}
              />
              <Route
                  path="/upload"
                  exact
                  element={<Upload/>}
              />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
