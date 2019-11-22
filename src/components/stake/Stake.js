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

const Stake = (props) => {
  const ctx = useContext(DataContext);

  const [ratio, setRatio] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [counterparty, setCounterparty] = useState("");
  const [countdownLength, setCountdownLength] = useState("");

  const [valid, setValid] = useState(false);
  const [creatingStake, setCreatingStake] = useState(false);

  const validator = (text, type) => {
    if (text === null || text === undefined || text.trim().length === 0) {
      return {};
    }

    let validate = false;

    switch(type) {
      case "address":
        validate = Validator.isAddress(text);
        break;

      case "+number":
        validate = Validator.isPositiveInteger(text);
        break;

      case "ratio":
        validate = Validator.isRatio(text);
        break;

      case "+float":
        validate = Validator.isPositiveFloat(text);
        break;
    }

    if (
      Validator.isAddress(counterparty) &&
      Validator.isRatio(ratio) &&
      Validator.isPositiveInteger(countdownLength) &&
      Validator.isPositiveFloat(stakeAmount)
    ) {
      setValid(true);
    } else {
      setValid(false);
    }

    return { validate };
  };

  const stake = async () => {
    setCreatingStake(true);

    try {
      const { griefing } = await ctx.client.stake({
        stakeAmount,
        counterparty,
        countdownLength,
        ratio
      });

      addAlert(ctx, {
        message: `Created griefing contract: ${griefing.address}`,
        cls: "toast-header-success"
      });
    } catch (err) {
      console.error(err);
      addAlert(ctx, {
        message: err.message,
        cls: "toast-header-error"
      });
    }

    setCreatingStake(false);
  };

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Stake</MDBCardTitle>
        <MDBCardText>
          Stake using countdown griefing agreement
        </MDBCardText>
        <Input
          label="Counterparty"
          disabled={ctx.disabled}
          text={counterparty}
          setText={setCounterparty}
          validator={(text) => validator(text, "address")}
        />
        <Input
          label="Agreement length (in seconds)"
          disabled={ctx.disabled}
          text={countdownLength}
          setText={setCountdownLength}
          validator={(text) => validator(text, "+number")}
        />
        <InputGroup
          prepend="NMR"
          label="Stake amount"
          disabled={ctx.disabled}
          text={stakeAmount}
          setText={setStakeAmount}
          validator={(text) => validator(text, "+float")}
        />
        <Input
          label="Griefing ratio"
          disabled={ctx.disabled}
          text={ratio}
          setText={setRatio}
          validator={(text) => validator(text, "ratio")}
        />
        <SpinnerButton
          title="Stake"
          style={{ marginRight: "10px" }}
          disabled={ctx.disabled || creatingStake}
          onClick={stake}
        />
      </MDBCardBody>
    </MDBCard>
  );
};

export default Stake;
