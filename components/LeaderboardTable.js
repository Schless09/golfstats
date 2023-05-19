import PropTypes from "prop-types";
import "./leaderboardTable.module.css"; // Import the CSS file


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
          <th>Golfer</th>
          <th>Total</th>
          <th>Today</th>
          <th>Thru</th>
          <th>Winnings</th>
          <th>Odds to Win</th>
        </tr>
      </thead>
      <tbody>
        {leaderboardRows.map((item, index) => (
          <tr key={index}>
            <td>{item.position}</td>
            <td>
              {item.firstName} {item.lastName}
            </td>
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
                ).toFixed(0)
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
