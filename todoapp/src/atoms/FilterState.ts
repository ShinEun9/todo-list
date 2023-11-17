import { atom } from "recoil";

const filterState = atom({
  key: "filterState",
  default: "All",
});

const timeState = atom({
  key: "timeState",
  default: true,
});

const inputState = atom({
  key: "inputState",
  default: "",
});

export { filterState, timeState, inputState };
