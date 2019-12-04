import React from "react";

import ScrollArea from "react-scrollbar";
import { Container, Row, Col } from "react-bootstrap";
import {
  Feed,
  Post,
  Login,
  Stake,
  Reveal,
  Reward,
  Punish,
  Release,
  Retrieve,
  ErasureProvider
} from "@robinthomas/react-erasure";

const EmptyRow = ({ height }) => (
  <Row style={{ height: `${height ? height: 25}px` }}>
    <Col>&nbsp;</Col>
  </Row>
);

const Erasure = ({ child }) => (
  <Row>
    <Col md="6">{child}</Col>
  </Row>
);

const App = ({ version, griefingType }) => (
  <ErasureProvider version={version} griefingType={griefingType}>
    <ScrollArea
      speed={0.8}
      className="react-erasure-scrollarea"
      smoothScrolling={true}
      horizontal={false}
      minScrollSize
    >
      <Container>
        <EmptyRow />
        <Erasure child={<Login/>} />
        <EmptyRow />
        <Erasure child={<Feed/>} />
        <EmptyRow />
        <Row>
          <Col><Post /></Col>
          <Col><Reveal /></Col>
        </Row>
        <EmptyRow />
        <Erasure child={<Stake/>} />
        <EmptyRow />
        <Row>
          <Col><Punish /></Col>
          <Col><Reward /></Col>
        </Row>
        <EmptyRow />
        <Row>
          <Col><Release /></Col>
          <Col><Retrieve /></Col>
        </Row>
        <EmptyRow height="150" />
      </Container>
    </ScrollArea>
  </ErasureProvider>
);

export default App;
