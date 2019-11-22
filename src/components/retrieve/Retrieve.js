import React, { useContext, useState } from "react";

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import { Spinner, Row, Col } from "react-bootstrap";

import { addAlert } from "../Alert";
import Chooser from "../Chooser";
import Input from "../Input";
import SpinnerButton from "../SpinnerButton";

import Validator from "../../utils/Validator";
import { DataContext } from "../../utils/DataProvider";

const Retrieve = (props) => {
  const ctx = useContext(DataContext);

  const [recipient, setRecipient] = useState("");

  const validator = (text, type) => {
    if (text === null || text === undefined || text.trim().length === 0) {
      return {};
    }

    let validate = false;

    switch(type) {
      case "address":
        validate = Validator.isAddress(text);
        break;
    }

    return { validate };
  };

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Retrieve Stake</MDBCardTitle>
        <MDBCardText>
          Retrieve the stake to the below recipient
        </MDBCardText>
        <Chooser
          name="Griefing Address"
          items={[]}
          item={null}
          setItem={() => true}
          disabled={ctx.disabled}
        />
        <Input
          label="Recipient"
          disabled={ctx.disabled}
          text={recipient}
          setText={setRecipient}
          validator={(text) => validator(text, "address")}
        />
        <SpinnerButton
          title="Retrieve Stake"
          style={{ marginRight: "10px" }}
          disabled={ctx.disabled}
        />
      </MDBCardBody>
    </MDBCard>
  );
};

export default Retrieve;
