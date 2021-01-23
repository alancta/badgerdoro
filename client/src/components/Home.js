import React, { useState, useRef } from "react";
import { Container, Row, Col, Button, Overlay, Popover } from "react-bootstrap";

import { Link } from "react-router-dom";
import Timer from "./Timer";

import "./Home.css";
const Home = () => {
  return (
    <div>
      <div class="area vw-100">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <Container className="mt-4 mb-lg-4 ">
            <Row>
              <Col xs={8} lg={11} xl={11}></Col>
              <Col xs={4} lg={1} xl={1}>
                <div class="d-flex justify-content-end mr-2">
                  <div class="mr-2">
                    <Link to="/login">
                      <Button variant="outline-light">Login</Button>
                    </Link>{" "}
                  </div>
                  <p class="mt-2">or</p>
                  <div class="ml-2">
                    <Link to="/register">
                      <Button class="ml-2 " variant="outline-light">
                        Register
                      </Button>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={7} lg={8}></Col>
              <Col xs={5} lg={4}>
                <div class="mt-2 ml-3">
                  <p class="text-right">to start earning BadgerBucks!</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                {" "}
                <div class="context">
                  <h1>Badgerdoro </h1>
                  <h4>get rewarded for being productive!</h4>
                </div>
              </Col>
            </Row>
          </Container>

          <Container className="mt-4 mb-lg-4 container-fluid">
            <Row>
              <Col lg={12}>
                {" "}
                <Timer></Timer>
              </Col>
            </Row>
          </Container>

          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};
export default Home;
