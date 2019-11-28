import React, { useEffect, useContext } from "react";

import ScrollArea from "react-scrollbar";
import { Container, Row, Col } from "react-bootstrap";
import ErasureClient from "@robinthomas/erasure-client";

import Feed from "../components/feed";
import Post from "../components/post";
import Login from "../components/login";
import Stake from "../components/stake";
import Reveal from "../components/reveal";
import Reward from "../components/reward";
import Punish from "../components/punish";
import Release from "../components/release";
import Retrieve from "../components/retrieve";

import { DataContext } from "../utils/DataProvider";

const App = ({ version, griefingType }) => {
  const ctx = useContext(DataContext);

  useEffect(() => {
    const fn = async () => {
      ctx.setClient(new ErasureClient({ version }));
    }

    fn();
  }, [version]);

  return (
    <ScrollArea
      speed={0.8}
      className="react-erasure-scrollarea"
      smoothScrolling={true}
      horizontal={false}
      minScrollSize
    >
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
        <Row><Col md="6"><Stake /></Col></Row>
        <Row><Col>&nbsp;</Col></Row>
        <Row>
          <Col><Punish /></Col>
          <Col><Reward /></Col>
        </Row>
        <Row><Col>&nbsp;</Col></Row>
        <Row>
          <Col><Release /></Col>
          <Col><Retrieve /></Col>
        </Row>
        <Row style={{ height: "150px" }}><Col>&nbsp;</Col></Row>
      </Container>
    </ScrollArea>
  );
}

export default App;
