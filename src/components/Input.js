import React, { useState } from "react";

import { MDBInput } from "mdbreact";
import { Row, Col } from "react-bootstrap";

import { DataConsumer } from "../utils/DataProvider";

const Input = ({ text, setText, validator, disabled, label }) => {
  const trigger = (target, text) => {
    setText(text);

    if (validator) {
      const { validate } = validator(text);

      if (validate === undefined) {
        target.classList.remove("is-valid");
        target.classList.remove("is-invalid");
      } else if (validate === false) {
        target.classList.remove("is-valid");
        target.classList.add("is-invalid");
      } else {
        target.classList.remove("is-invalid");
        target.classList.add("is-valid");
      }
    }
  };

  return (
    <Row>
      <Col>
        <MDBInput
          type="text"
          value={text}
          label={label}
          onChange={e => trigger(e.target, e.target.value)}
          disabled={disabled}
          size="sm"
        />
      </Col>
    </Row>
  );
};

export default Input;
