import React, { useContext, useState } from "react";

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBInput, MDBInputGroup } from "mdbreact";
import { Spinner, Row, Col } from "react-bootstrap";

import { addAlert } from "../Alert";
import Chooser from "../Chooser";
import SpinnerButton from "../SpinnerButton";
import { DataContext } from "../../utils/DataProvider";

const Punish = (props) => {
  const ctx = useContext(DataContext);

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

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
        <MDBInputGroup
          size="sm"
          material
          hint="Punish amount"
          containerClassName="stake"
          prepend="NMR"
          disabled={ctx.disabled}
        />
        <MDBInput size="sm" label="Message" disabled={ctx.disabled}/>
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
