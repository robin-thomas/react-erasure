import React, { useContext, useState, useEffect } from "react";

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";

import { addAlert } from "../Alert";
import Input from "../Input";
import InputGroup from "../InputGroup";
import SpinnerButton from "../SpinnerButton";

import Validator from "../../utils/Validator";
import { DataContext } from "../../utils/DataProvider";

const Stake = (props) => {
  const ctx = useContext(DataContext);

  const [ratio, setRatio] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [counterParty, setCounterParty] = useState("");
  const [countdownLength, setCountdownLength] = useState("");

  const [valid, setValid] = useState(false);
  const [creatingStake, setCreatingStake] = useState(false);

  // Load all the feeds.
  useEffect(() => {
    const fn = async () => {
      ctx.setLoadingGriefings(true);

      try {
        const griefings = await ctx.client.getGriefings();
        if (griefings !== null) {
          ctx.setGriefings(Object.keys(griefings));

          addAlert(ctx, {
            message: "Griefings loaded!",
            cls: "toast-header-success"
          });
        } else {
          addAlert(ctx, {
            message: "No griefings to load!",
            cls: "toast-header-success"
          });
        }
      } catch (err) {
        addAlert(ctx, {
          message: err.message,
          cls: "toast-header-error"
        });
      }

      ctx.setLoadingGriefings(false);
    };

    if (ctx.disabled === false) {
      fn();
    }
  }, [ctx.disabled]);

  const validator = (text, type) => {
    if (text === null || text === undefined || text.trim().length === 0) {
      return {};
    }

    let args;
    let validate = false;

    switch(type) {
      case "address":
        validate = Validator.isAddress(text);
        args = [
          validate,
          Validator.isPositiveInteger(countdownLength),
          Validator.isPositiveFloat(stakeAmount),
          Validator.isRatio(ratio)
        ];
        break;

      case "+number":
        validate = Validator.isPositiveInteger(text);
        args = [
          Validator.isAddress(counterParty),
          validate,
          Validator.isPositiveFloat(stakeAmount),
          Validator.isRatio(ratio)
        ];
        break;

      case "ratio":
        validate = Validator.isRatio(text);
        args = [
          Validator.isAddress(counterParty),
          Validator.isPositiveInteger(countdownLength),
          Validator.isPositiveFloat(stakeAmount),
          validate
        ];
        break;

      case "+float":
        validate = Validator.isPositiveFloat(text);
        args = [
          Validator.isAddress(counterParty),
          Validator.isPositiveInteger(countdownLength),
          validate,
          Validator.isRatio(ratio)
        ];
        break;
    }

    setValid(args.reduce((p, c) => p && c, true));

    return { validate };
  };

  const stake = async () => {
    setCreatingStake(true);

    try {
      const { griefing } = await ctx.client.stake({
        stakeAmount,
        counterParty,
        griefingType: ctx.griefingType,
        countdownLength,
        ratio
      });

      ctx.setGriefings(griefings => {
        const _griefings = Object.assign([], griefings);
        _griefings.push(griefing.address);
        return _griefings;
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
          label="CounterParty"
          disabled={ctx.disabled || creatingStake}
          text={counterParty}
          setText={setCounterParty}
          validator={(text) => validator(text, "address")}
        />
        <Input
          label="Agreement length (in seconds)"
          disabled={ctx.disabled || creatingStake}
          text={countdownLength}
          setText={setCountdownLength}
          validator={(text) => validator(text, "+number")}
        />
        <InputGroup
          prepend="NMR"
          label="Stake amount"
          disabled={ctx.disabled || creatingStake}
          text={stakeAmount}
          setText={setStakeAmount}
          validator={(text) => validator(text, "+float")}
        />
        <Input
          label="Griefing ratio"
          disabled={ctx.disabled || creatingStake}
          text={ratio}
          setText={setRatio}
          validator={(text) => validator(text, "ratio")}
        />
        <SpinnerButton
          title="Stake"
          style={{ marginRight: "10px" }}
          disabled={ctx.disabled || !valid}
          onClick={stake}
        />
      </MDBCardBody>
    </MDBCard>
  );
};

export default Stake;
