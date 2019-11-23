import { Ethers } from "@robinthomas/erasure-client";

const Validator = {
  isAddress: (text) => Ethers.isAddress(text),
  isPositiveInteger: (text) => Number.isInteger(Number(text)),
  isRatio: (text) => /^[0-1](\.\d+)?$/.test(text),
  isPositiveFloat: (text) => /^\d+(\.\d+)?$/.test(text) && Number.parseFloat(text) > 0,
  isValidString: (text) => text !== null && text !== undefined && text.trim().length > 0,
};

export default Validator;
