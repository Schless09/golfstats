import PropTypes from "prop-types";

function LeaderboardTable({
  leaderboardRows,
  startingHole,
  payouts,
  getThruValue,
  calculateWinnings,
  odds,
}) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Position</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Total</th>
          <th>Current Round</th>
          <th>Thru</th>
          <th>Winnings</th>
          <th>Odds to Win</th>
        </tr>
      </thead>
      <tbody>
        {leaderboardRows.map((item, index) => (
          <tr key={index}>
            <td>{item.position}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.total}</td>
            <td>{item.currentRoundScore}</td>
            <td>
              {getThruValue(
                item.currentHole,
                startingHole,
                item.currentRound,
                item.roundComplete
              )}
            </td>

            <td>
              ${" "}
              {Number(
                calculateWinnings(
                  item.position,
                  payouts,
                  leaderboardRows
                ).toFixed(2)
              ).toLocaleString("en-US")}
            </td>
            <td>{odds}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

LeaderboardTable.propTypes = {
  leaderboardRows: PropTypes.array.isRequired,
  startingHole: PropTypes.number.isRequired,
  payouts: PropTypes.object.isRequired,
  getThruValue: PropTypes.func.isRequired,
  calculateWinnings: PropTypes.func.isRequired,
  odds: PropTypes.string,
};

export default LeaderboardTable;
