import React, { useContext, useState } from "react";

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import { Spinner, Row, Col } from "react-bootstrap";

import { addAlert } from "../Alert";
import Input from "../Input";
import Chooser from "../Chooser";
import InputGroup from "../InputGroup";
import SpinnerButton from "../SpinnerButton";

import Validator from "../../utils/Validator";
import { DataContext } from "../../utils/DataProvider";

const Punish = (props) => {
  const ctx = useContext(DataContext);

  const [message, setMessage] = useState("");
  const [punishAmount, setPunishAmount] = useState("");

  const validator = (text, type) => {
    if (text === null || text === undefined || text.trim().length === 0) {
      return {};
    }

    let validate = false;

    switch(type) {
      case "string":
        validate = true;
        break;

      case "+float":
        validate = Validator.isPositiveFloat(text);
        break;
    }

    return { validate };
  };

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Punish</MDBCardTitle>
        <MDBCardText>
          Punish the staker
        </MDBCardText>
        <Chooser
          name="Griefing Address"
          items={[]}
          item={null}
          setItem={() => true}
          disabled={ctx.disabled}
        />
        <InputGroup
          prepend="NMR"
          label="Punish amount"
          disabled={ctx.disabled}
          text={punishAmount}
          setText={setPunishAmount}
          validator={(text) => validator(text, "+float")}
        />
        <Input
          label="Message"
          disabled={ctx.disabled}
          text={message}
          setText={setMessage}
          validator={(text) => validator(text, "string")}
        />
        <SpinnerButton
          title="Punish"
          style={{ marginRight: "10px" }}
          disabled={ctx.disabled}
        />
      </MDBCardBody>
    </MDBCard>
  );
};

export default Punish;
