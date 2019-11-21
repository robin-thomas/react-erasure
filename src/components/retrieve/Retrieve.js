import React, { useContext, useState } from "react";

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBInput, MDBInputGroup } from "mdbreact";
import { Spinner, Row, Col } from "react-bootstrap";

import { addAlert } from "../Alert";
import Chooser from "../Chooser";
import SpinnerButton from "../SpinnerButton";
import { DataContext } from "../../utils/DataProvider";

const Retrieve = (props) => {
  const ctx = useContext(DataContext);

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

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
        <MDBInput size="sm" label="Recipient" disabled={ctx.disabled}/>
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