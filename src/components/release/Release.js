import React, { useContext, useState } from "react";

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import { Spinner, Row, Col } from "react-bootstrap";

import { addAlert } from "../Alert";
import Chooser from "../Chooser";
import InputGroup from "../InputGroup";
import SpinnerButton from "../SpinnerButton";

import Validator from "../../utils/Validator";
import { DataContext } from "../../utils/DataProvider";

const Release = (props) => {
  const ctx = useContext(DataContext);

  const [releaseAmount, setReleaseAmount] = useState("");

  const validator = (text, type) => {
    if (text === null || text === undefined || text.trim().length === 0) {
      return {};
    }

    let validate = false;

    switch(type) {
      case "+float":
        validate = Validator.isPositiveFloat(text);
        break;
    }

    return { validate };
  };

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Release Stake</MDBCardTitle>
        <MDBCardText>
          Release some stake to the staker
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
          label="Release amount"
          disabled={ctx.disabled}
          text={releaseAmount}
          setText={setReleaseAmount}
          validator={(text) => validator(text, "+float")}
        />
        <SpinnerButton
          title="Release Stake"
          style={{ marginRight: "10px" }}
          disabled={ctx.disabled}
        />
      </MDBCardBody>
    </MDBCard>
  );
};

export default Release;
