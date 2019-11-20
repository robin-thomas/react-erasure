import React, { useEffect, useContext } from "react";

import { Container, Row, Col } from "react-bootstrap";
import ErasureClient from "@robinthomas/erasure-client";

import Feed from "../components/feed";
import Post from "../components/post";
import Login from "../components/login";
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
      <Row><Col md="5"><Login /></Col></Row>
      <Row><Col>&nbsp;</Col></Row>
      <Row><Col md="5"><Feed /></Col></Row>
      <Row><Col>&nbsp;</Col></Row>
      <Row><Col md="5"><Post /></Col></Row>
    </Container>
  );
}

export default App;
