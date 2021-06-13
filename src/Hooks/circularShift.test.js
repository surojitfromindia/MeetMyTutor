function circularShift(
  th = 5,
  ci = 5,
  ml = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
) {
  if (ml.length - ci < th) {
    return [
      ...ml.slice(ci - ml.length, ml.length),
      ...ml.slice(0, th - ml.length + ci),
    ];
  } else {
    return ml.slice(ci, ci + th);
  }
}


