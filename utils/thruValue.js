// export function getThruValue(currentHole, startingHole, status) {
//    if (status === "between rounds") {
//      return "-";
//    } else if (startingHole === 1) {
//      return currentHole;
//    } else if (startingHole === 10 && currentHole < 10) {
//      return currentHole + 9;
//    } else {
//      return currentHole;
//    }
//  }

export function getThruValue(currentHole, startingHole, status, roundComplete) {
   if (status === "between rounds") {
     return "-";
   } else if (roundComplete === "true") {
     return "F";
   } else if (startingHole === 1) {
     return currentHole;
   } else if (startingHole === 10 && currentHole < 10) {
     return currentHole + 9;
   } else {
     return currentHole;
   }
 }
