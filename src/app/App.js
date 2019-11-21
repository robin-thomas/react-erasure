import React, { useEffect, useContext } from "react";

import { Container, Row, Col } from "react-bootstrap";
import ErasureClient from "@robinthomas/erasure-client";

import Feed from "../components/feed";
import Post from "../components/post";
import Login from "../components/login";
import Reveal from "../components/reveal";
import { DataContext } from "../utils/DataProvider";

const App = ({ version }) => {
  const ctx = useContext(DataContext);

  useEffect(() => {
    const fn = async () => {
      ctx.setClient(new ErasureClient({ version }));
    }

    fn();
  }, [version]);

  return (
    <Container>
      <Row><Col>&nbsp;</Col></Row>
      <Row><Col md="6"><Login/></Col></Row>
      <Row><Col>&nbsp;</Col></Row>
      <Row><Col md="6"><Feed /></Col></Row>
      <Row><Col>&nbsp;</Col></Row>
      <Row>
        <Col><Post />
        </Col>
        <Col><Reveal /></Col>
      </Row>
      <Row><Col>&nbsp;</Col></Row>
    </Container>
  );
}

export default App;
