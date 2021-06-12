import { useState } from "react";

/**
 * take one list as argument
 * return
 * a back and a fowrad function
 * and a current value
 * back and forward function has optional step
 */
export default function useListIterator(ilist, initalIndex = 0) {
  const [currentValue, setCurrentValue] = useState(ilist[initalIndex]);

  const [lastI, setlatI] = useState(0);

  function goForward(step = 1) {
    if (lastI + step < ilist.length) {
      setCurrentValue(ilist[lastI + step]);
      setlatI(lastI + step);
    }
  }
  function goBack(step = -1) {
    if (lastI + step >= 0) {
      setlatI(lastI + step);
      setCurrentValue(ilist[lastI - 1]);
    }
  }
  function setGoTo(indx) {
    setCurrentValue(ilist[indx]);
    setlatI(indx);
  }
  return {
    currentValue,
    goForward,
    goBack,
    setGoTo,
  };
}
