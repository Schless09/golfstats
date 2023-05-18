import { useEffect, useState } from "react";
import { getGolfData } from "./api";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await getGolfData();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      {data && data.leaderboardRows && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Position</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Total</th>
              <th>Current Round Score</th>
              <th>Current Hole</th>
            </tr>
          </thead>
          <tbody>
            {data.leaderboardRows.map((item, index) => (
              <tr key={index}>
                <td>{item.position}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.total}</td>
                <td>{item.currentRoundScore}</td>
                <td>{item.currentHole}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
