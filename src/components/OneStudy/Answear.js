import { useEffect } from "react";
import {
  FiArrowLeftCircle as Bil,
  FiArrowRightCircle as BiR,
  FiMinusCircle as FCC,
} from "react-icons/fi";

import useListIterator from "../../Hooks/useListIterator";

export default function Answear({ qlist, onclose, laid }) {
  const { currentValue, goForward, goBack, setGoTo } = useListIterator(qlist);

  useEffect(() => {
    setGoTo(laid);
  }, [laid]);

  const handleFo = () => {
    goForward();
  };
  const handleBac = () => {
    goBack();
  };
  return (
    <div
      className={
        "h-2/3 w-4/5 bg-coolGray-700 rounded-md flex flex-col overflow-hidden"
      }
    >
      <div className={"h-10 flex px-2.5 py-3 justify-between"}>
        <div></div>
        <div>
          <FCC
            onClick={() => {
              onclose();
            }}
            size={20}
            className={"hover:text-red-400 transform active:scale-90"}
          />
        </div>
      </div>
      <div className={"flex-grow px-5 py-5 flex flex-col space-y-5 "}>
        <div className={"text-gray-100 tracking-wide text-base"}>
          <div className={"tracking-widest  text-xs text-gray-400 font-medium"}>
            Question
          </div>
          {currentValue?.qtext}
        </div>
        <div className={"text-gray-300 "}>
          <div className={"tracking-widest  text-xs text-gray-400 font-medium"}>
            Description
          </div>
          {currentValue?.ans}
        </div>
      </div>
      <div
        className={
          "py-2 flex justify-between items-center px-2.5 bg-emerald-600 "
        }
      >
        <div>
          <div className={"font-poppin"}>
            {currentValue?.reference?.toUpperCase()}
          </div>
        </div>
        <div className={"flex space-x-1 "}>
          <Bil
            onClick={handleBac}
            size={"25"}
            className={"hover:text-coolGray-700 transform active:scale-90"}
          />
          <BiR
            onClick={handleFo}
            size={"25"}
            className={"hover:text-coolGray-700 transform active:scale-90"}
          />
        </div>
      </div>
    </div>
  );
}
