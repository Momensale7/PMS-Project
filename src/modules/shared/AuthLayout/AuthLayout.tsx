import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import logo from '../../../assets/images/PMSlogo.png'

export default function AuthLayout() {
  return (
    <Container fluid className="auth-container">
      {/* backgrounds */}
      <div className="vector-rightImg"></div>
      <div className="vector-leftImg"></div>

      {/* outlet at center*/}
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} md={8} lg={6} className="auth-content text-center">

        <img src={logo}/>

          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
