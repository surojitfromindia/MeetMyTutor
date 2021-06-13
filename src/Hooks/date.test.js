function AMonth({ year, month, day }) {
  let v = new Date(year, month, day);
  console.log(v.getDay());
}

AMonth({ year: 2021, month: 5, day: 1 });

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
  console.log(h[month]);
}

changetoMonthIndex("MAR")