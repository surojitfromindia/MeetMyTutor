import { useEffect, useState } from "react";
import OneQ from "./OneQ";
import PrgBar from "../../CommonComponents/PrgBar";
const q2 = [
  {
    qv: "Some Question 1 ?",
    o: [
      "This is a very very very big option here. So i guess this will wrap down.This is a very very very big option here. So i guess this will wrap down.This is a very very very big option here. So i guess this will wrap down.",
      "Answ 2",
      "Answ 3",
      "Answ 4",
    ],
    oai: 2,
    ansg: -1,
  },
  {
    qv: "Some Question  2?",
    o: ["Answ 1", "Answ 2", "Answ 3", "Answ 4"],
    oai: 4, //correct ans
    ansg: -1,
  },
  {
    qv: "Some Question 2 ?",
    o: [
      "Answ 2",
      "This is a very very very big option here. So i guess this will wrap down.This is a very very very big option here. So i guess this will wrap down.This is a very very very big option here. So i guess this will wrap down.",

      "Answ 4",
    ],
    oai: 3,
    ansg: -1,
  },
  {
    qv: "Some Question 3 ?",
    o: [
      "This is a very very very big option here. So i guess this will wrap down.",
      "Answ 2",
      "Answ 3",
      "Answ 4",
    ],
    oai: 2,
    ansg: -1,
  },
  {
    qv: "Some Question 4 ?",
    o: [
      "This is a very very very big option here. ",
      "Answ 2",
      "This is a very very very big option here.  ",

      "Answ 4",
      "Answ 5",
    ],
    oai: 2,
    ansg: -1,
  },
  {
    qv: "Some Question 5 ?",
    o: [
      "Answ 2",
      "Answ 3",
      "This is a very very very big option here. So i guess this will wrap down.This is a very very very big option here. So i guess this will wrap down.This is a very very very big option here. So i guess this will wrap down.",
    ],
    oai: 2,
    ansg: -1,
  },
  {
    qv: "Some Question 6 ?",
    o: ["Answ 2", "Answ 3", "Answ 4", "So i guess this will wrap down."],
    oai: 1,
    ansg: -1,
  },
];

export default function Board() {
  const [current, setCurrent] = useState(1);
  const [attempted, setattempted] = useState(0);
  const [score, setscore] = useState(0);
  const [q, setQ] = useState(q2);

  useEffect(() => {
    if (current === q.length + 1) {
      let y = q.filter((i) => i.ansg !== -1).length;
      setTimeout(() => {
        setattempted(y);
        let score = q.filter((qs) => qs.oai === qs.ansg).length;
        setscore(score);
      }, 400);
    }
  }, [current, q]);



  const onNext = () => {
    if (current <= q.length + 1) {
      document.getElementById(`q${current}`).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      document.getElementById(`q${current - 1}`).classList.add("ivisible");
      setCurrent(current + 1);
    }
  };

  const handleAnsSubmit = (qi, ai) => {
    //qi is a 0 base index so increase it by 1
    let temp = q;
    temp[qi].ansg = ai + 1;
    setQ([...temp]);
    setTimeout(onNext, 400);
  };
  return (
    <div>
      <div className={"flex flex-row overflow-hidden"}>
        {q.map((fq, idx) => (
          <div
            key={`q${idx}`}
            id={`q${idx}`}
            className={"pr-1 flex-shrink-0 w-full "}
          >
            <OneQ fq={fq} meInd={idx} onOptionSubmit={handleAnsSubmit} />
          </div>
        ))}
        <div id={`q${q.length}`} className={"flex-shrink-0 w-full h-full"}>
          <div>
            <div className={"text-3xl font-medium text-lightBlue-300 "}>
              You Have Attained
            </div>
            <div className={"text-lightBlue-200 text-2xl font-semibold mb-2"}>
              {`${attempted} / ${q.length}`}
            </div>
            <div className={"w-56"}>
              <PrgBar max={q.length} value={attempted} />
            </div>
            <div className={"text-xl font-medium text-lightBlue-200 mt-3 "}>
              You Scored
            </div>
            <div className={"text-lightBlue-200 text-xl font-semibold mb-2"}>
              {`${score} / ${q.length}`}
            </div>
            <div className={"w-56"}>
              <PrgBar max={q.length} value={score} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={"flex flex-row justify-end pr-1 space-x-2 items-center mt-2"}
      >
        {current > q.length && (
          <div className={"text-gray-100"}>Refresh To Repeat</div>
        )}

        <button
          className={
            "w-20 py-1 outline-none focus:outline-none hover:bg-gray-300 text-lightBlue-600 font-bold tracking-wider text-sm  bg-gray-100 bg-opacity-80 rounded-sm"
          }
        >
          Submit
        </button>
        {current <= q.length && (
          <button
            className={
              "w-20 py-1 outline-none focus:outline-none hover:bg-gray-300 text-lightBlue-600 font-bold tracking-wider text-sm  bg-gray-100 bg-opacity-80 rounded-sm"
            }
            onClick={onNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
