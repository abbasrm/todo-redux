import * as actionTypes from "./actionTypes";

export const openAccordion = date => {
  return {
    type: actionTypes.OPEN_ACCORDION,
    date: date
  };
};
