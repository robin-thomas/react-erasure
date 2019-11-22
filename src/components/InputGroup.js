import React from "react";

import { Row, Col } from "react-bootstrap";

import Input from "./Input";

const InputGroup = ({ prepend, label, text, setText, disabled, validator }) => (
  <Row>
    <Col
      md="auto"
      className="align-self-center pr-0"
      style={{ marginTop: "5px", fontSize: "15px" }}
    >
      {prepend}
    </Col>
    <Col>
      <Input
        label={label}
        disabled={disabled}
        text={text}
        setText={setText}
        validator={validator}
      />
    </Col>
  </Row>
);

export default InputGroup;
