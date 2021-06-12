export default function PrgBar({ min = 0, max = 0, value = 0 }) {
  let pGradient = " from-emerald-500  to-red-400 ";
  function calculateWidth() {
    let percentageOfValue = (Math.min(value, max) / max + min) * 100;
    return percentageOfValue;
  }

  if (calculateWidth() > 90) {
    pGradient = " from-emerald-500  to-green-400 ";
  } else if (calculateWidth() > 50) {
    pGradient = " from-indigo-500  to-emerald-400 ";
  } else if (calculateWidth() > 20) {
    pGradient = " from-white  to-green-400 ";
  }

  const pStyle = calculateWidth();
  return (
    <div className={"flex items-center"}>
      <div className={"w-full h-3 rounded-lg bg-gray-700 "}>
        <div
          style={{ width: `${pStyle}%` }}
          className={`transition-width  ease-in-out  duration-500 flex items-center text-xs  justify-end h-3 rounded-lg bg-gradient-to-r ${pGradient}`}
        ></div>
      </div>
      <div
        className={
          "px-2 hidden  transition-width ease-in-out duration-700  text-gray-200 text-right text-xs"
        }
      >
        {Math.ceil(pStyle)}%
      </div>
    </div>
  );
}
