import { atom } from "recoil";

const doneState = atom({
  key: "doneState",
  default: "All",
});

const timeState = atom({
  key: "timeState",
  default: false,
});

const inputState = atom({
  key: "inputState",
  default: "",
});

export { doneState, timeState, inputState };
