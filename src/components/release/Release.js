import React, { useContext, useState } from "react";

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBInput, MDBInputGroup } from "mdbreact";
import { Spinner, Row, Col } from "react-bootstrap";

import { addAlert } from "../Alert";
import Chooser from "../Chooser";
import SpinnerButton from "../SpinnerButton";
import { DataContext } from "../../utils/DataProvider";

const Release = (props) => {
  const ctx = useContext(DataContext);

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

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
        <MDBInput size="sm" label="Amount to release" disabled={ctx.disabled}/>
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
