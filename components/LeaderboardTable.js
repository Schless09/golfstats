import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./leaderboardTable.module.css";

function LeaderboardTable({
  leaderboardRows,
  startingHole,
  payouts,
  getThruValue,
  calculateWinnings,
  odds,
}) {
  const [sortedRows, setSortedRows] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    setSortedRows(leaderboardRows); // Initialize sortedRows with the original data
  }, [leaderboardRows]);

  const handleSort = (column) => {
    let sortedData = [...sortedRows];

    if (sortOrder === "asc") {
      sortedData.sort((a, b) => {
        if (a.position === "WD" || b.position === "WD") {
          return a.position === "WD" ? 1 : -1;
        }
        if (a.position === "cut" || b.position === "cut") {
          return a.position === "cut" ? 1 : -1;
        }
        if (column === "total" || column === "currentRoundScore") {
          const aValue = a[column] === "E" ? 0 : parseInt(a[column]);
          const bValue = b[column] === "E" ? 0 : parseInt(b[column]);
          return aValue > bValue ? 1 : -1;
        }
        return a[column] > b[column] ? 1 : -1;
      });
      setSortOrder("desc");
    } else {
      sortedData.sort((a, b) => {
        if (a.position === "WD" || b.position === "WD") {
          return a.position === "WD" ? 1 : -1;
        }
        if (a.position === "cut" || b.position === "cut") {
          return a.position === "cut" ? -1 : 1;
        }
        if (column === "total" || column === "currentRoundScore") {
          const aValue = a[column] === "E" ? 0 : parseInt(a[column]);
          const bValue = b[column] === "E" ? 0 : parseInt(b[column]);
          return aValue > bValue ? -1 : 1;
        }
        return a[column] > b[column] ? -1 : 1;
      });
      setSortOrder("asc");
    }

    setSortedRows(sortedData);
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th onClick={() => handleSort("position")}>Pos</th>
          <th onClick={() => handleSort("lastName")}>Golfer</th>
          <th onClick={() => handleSort("total")}>Total</th>
          <th onClick={() => handleSort("currentRoundScore")}>Today</th>

          <th onClick={() => handleSort("thru")}>Thru</th>
          <th onClick={() => handleSort("winnings")}>Winnings</th>
          {/* <th onClick={() => handleSort("odds")}>Odds to Win</th> */}
        </tr>
      </thead>
      <tbody>
        {sortedRows.map((item, index) => (
          <tr key={index}>
            <td>{item.position}</td>
            <td>
              {item.firstName[0]} {item.lastName}
            </td>
            <td>{item.total}</td>
            <td>{item.currentRoundScore}</td>
            <td>
              {getThruValue(
                item.currentHole,
                startingHole,
                item.currentRound,
                item.roundComplete,
                item.teeTime
              )}
            </td>
            <td>
              ${""}
              {Number(
                calculateWinnings(
                  item.position,
                  payouts,
                  leaderboardRows
                ).toFixed(0)
              ).toLocaleString("en-US")}
            </td>
            {/* <td>{odds}</td> */}
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
