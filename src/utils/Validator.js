import { Ethers } from "@robinthomas/erasure-client";

const Validator = {
  isAddress: (text) => Ethers.isAddress(text),
  isPositiveNumber: (text) => Number.isInteger(Number(text)),
  isRatio: (text) => /^[0-1](\.\d+)?$/.test(text),
  isPositiveFloat: (text) => /^\d+(\.\d+)?$/.test(text) && Number.parseFloat(text) > 0,
};

export default Validator;
