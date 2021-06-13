import React, { useState, useEffect } from "react";
import useListIterator from "../../Hooks/useListIterator";
import { FaAngleDoubleRight as Arht } from "react-icons/fa";

export default function DateSelector({ onDateChanged, backColor }) {
  return (
    <div>
      <div>
        <MonthList onDateChanged={onDateChanged} backColor={backColor} />
      </div>
    </div>
  );
}

function MonthList({
  onDateChanged,
  showDate = false,
  dismissOnDateSelect = false,
  backColor,
}) {
  let cM = new Date().getMonth();

  const th = 5;
  const monthList = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const [ffive, setffive] = useState(circularShift(th, cM, monthList));
  const { currentValue, circularFo } = useListIterator(monthList, cM + th);
  const [currentDay, setCurrentDay] = useState();
  const [cIndex, setCIndex] = useState(0);
  const [currentYear, setCurrentYear] = useState(2021);
  const [openYearSelector, setOpenYearSelector] = useState(false);
  const [isFullClose, setFullClose] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    year: currentYear,
    month: cM,
    day: new Date().getDate(),
  });

  useEffect(() => {
    let currentMonth = changetoMonthIndex(ffive[cIndex]);
    onDateChanged({ year: currentYear, month: currentMonth, day: currentDay });
  }, [currentDay, currentYear, cIndex, ffive, onDateChanged]);

  const handleYearChange = (year) => {
    setCurrentYear(year);
    setOpenYearSelector(false);
  };
  const handleDayChange = (day) => {
    setCurrentDay(day);
    setOpenYearSelector(false);
    if (dismissOnDateSelect) {
      setFullClose(true);
    }
  };

  return (
    <div
      className={`group w-72  relative flex-col  flex justify-center items-center  ${backColor}   
        hover:rounded-b-none  rounded-3xl
       ${showDate && "rounded-t-none"}`}
    >
      {showDate && (
        <div
          className={
            "absolute bottom-12  rounded-t-3xl w-full  overflow-hidden"
          }
        >
          <ShowDate
            year={selectedDate.year}
            month={selectedDate.month + 1}
            day={selectedDate.day}
          />
        </div>
      )}
      <div
        className={
          "z-10 flex w-full justify-center items-center py-2 px-2 gap-1"
        }
      >
        <YearDrop
          initValue={currentYear.toString().substr(2, 3)}
          onselect={() => setOpenYearSelector(true)}
        />
        {ffive.map((c, index) =>
          index === cIndex ? (
            <Mid
              key={index}
              child={
                <MonthPill
                  onClick={() => {
                    setCIndex(index);
                  }}
                  month={c}
                />
              }
            />
          ) : (
            <MonthPill
              key={index}
              month={c}
              onClick={() => {
                setCIndex(index);
              }}
            />
          )
        )}
        <div className={"mx-1"}>
          <Arht
            onClick={() => {
              let j = ffive;
              j.shift();
              circularFo();
              j.push(currentValue);
              setffive([...j]);
            }}
          />
        </div>
      </div>
      {
        <div
          className={`w-full group-hover:block hidden  absolute top-12 ${backColor}  rounded-b-3xl `}
        >
          {openYearSelector ? (
            <YearRows currentYear={currentYear} onselect={handleYearChange} />
          ) : (
            !isFullClose && (
              <Days
                onselect={handleDayChange}
                currentDay={currentDay}
                pDay={new Date().getDate()}
              />
            )
          )}
        </div>
      }
    </div>
  );
}

function ShowDate({ year, month, day }) {
  return (
    <div
      className={
        "flex justify-center items-center py-2  bg-white bg-opacity-20"
      }
    >
      {year} - {month} - {day}
    </div>
  );
}

function Mid({ child }) {
  return (
    <div
      className={
        "flex flex-col rounded-full text-trueGray-700  font-medium tracking-wider items-center    bg-white"
      }
    >
      {child}
    </div>
  );
}

function MonthPill({ month = "JAN", inM = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col rounded-3xl cursor-pointer select-none ${
        inM ? "text-trueGray-200" : ""
      }  font-medium tracking-wider items-center w-14 py-1  `}
    >
      <div className={"text-xs"}>{month}</div>
    </div>
  );
}

function YearDrop({ onselect, initValue }) {
  return (
    <div
      onClick={onselect}
      className={
        "rounded-full flex-shrink-0 px-2 py-2 items-center h-8 w-8 font-medium text-sm cursor-pointer justify-center flex bg-gray-50 bg-opacity-90 text-gray-800"
      }
    >
      {initValue}
    </div>
  );
}

function YearRows({ currentYear, onselect }) {
  const vA = Array.from(miOdd(2021, 4));

  return (
    <div
      className={
        "grid grid-row-3 grid-cols-3 py-1.5 place-items-center gap-2 cursor-pointer text-sm"
      }
    >
      {vA.map((v) =>
        v === currentYear ? (
          <Mid
            key={v}
            child={
              <div
                onClick={() => {
                  onselect(v);
                }}
                className={"px-2 py-1"}
              >
                {v}
              </div>
            }
          />
        ) : (
          <div
            key={v}
            onClick={() => {
              onselect(v);
            }}
            className={`px-2 py-1`}
          >
            {v}
          </div>
        )
      )}
    </div>
  );
}

function Days({ pDay, onselect }) {
  const [hightLight, setHighlight] = useState();
  const A = [
    "",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
  ];
  return (
    <div>
      <div
        className={
          "grid grid-cols-7 gap-2 px-3 py-1.5  place-items-center justify-items-center "
        }
      >
        {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((v) => (
          <div
            key={v}
            className={
              "cursor-pointer  h-8 w-8 flex items-center justify-center  text-xs  "
            }
          >
            {v}
          </div>
        ))}
        {A.map((v) =>
          v === pDay ? (
            <Mid
              key={v}
              child={
                <div
                  onClick={() => {
                    onselect(v);
                  }}
                  className={
                    "cursor-pointer h-8 w-8  text-sm flex items-center justify-center"
                  }
                >
                  {v}
                </div>
              }
            />
          ) : (
            <div
              key={v}
              onClick={() => {
                setHighlight(v);
                onselect(v);
              }}
              className={`${
                v !== "" && "cursor-pointer"
              } h-8 w-8 flex items-center justify-center ${
                hightLight === v &&
                v !== "" &&
                "border-2 rounded-full text-sm  "
              }`}
            >
              {v}
            </div>
          )
        )}
      </div>
    </div>
  );
}

function changetoMonthIndex(month) {
  let h = {
    JAN: 0,
    FEB: 1,
    MAR: 2,
    APR: 3,
    MAY: 4,
    JUN: 5,
    JUL: 6,
    AUG: 7,
    SEP: 8,
    OCT: 9,
    NOW: 10,
    DEC: 11,
  };
  return h[month];
}

function* miOdd(middleValue, offset = 1) {
  for (let i = middleValue - offset; i <= middleValue + offset; i += 1) {
    yield i;
  }
}

function circularShift(th, ci, ml) {
  if (ml.length - ci < th) {
    return [
      ...ml.slice(ci - ml.length, ml.length),
      ...ml.slice(0, th - ml.length + ci),
    ];
  } else {
    return ml.slice(ci, ci + th);
  }
}
