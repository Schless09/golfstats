export function calculateWinnings(position, payouts, data) {
   let payoutKeys = Object.keys(payouts);
   let splitPosition = position.split("T");

   if (splitPosition.length > 1) {
     let tiedRank = parseInt(splitPosition[1]);
     let countOfTiedPositions = data.leaderboardRows.filter(
       (item) => item.position === position
     ).length;

     let tiedPositions = payoutKeys.slice(
       tiedRank - 1,
       tiedRank - 1 + countOfTiedPositions
     );
     let totalPayout = tiedPositions.reduce(
       (sum, pos) => sum + (payouts[pos] || 0),
       0
     );
     return totalPayout / tiedPositions.length;
   } else {
     return payouts[position] || 0;
   }
 }
