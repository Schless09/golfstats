export function getThruValue(
  currentHole,
  startingHole,
  status,
  roundComplete,
  teeTime
) {
  if (status === "between rounds") {
    return teeTime; // Return the teeTime value
  } else if (roundComplete === "true") {
    return "F";
  } else if (startingHole === "1") {
    return currentHole;
  } else {
    return currentHole;
  }
}
