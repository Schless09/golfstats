import { useEffect, useState } from "react";
import axios from "axios";
import { payouts } from "./payouts";
import Head from "next/head"; // import the Head component

function getThruValue(currentHole, startingHole, status) {
  if (status === "between rounds") {
    return "-";
  } else if (startingHole === 1) {
    return currentHole;
  } else if (startingHole === 10 && currentHole < 10) {
    return currentHole + 9;
  } else {
    return currentHole;
  }
}

function calculateWinnings(position, payouts, data) {
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
    return payouts[position] || 0; // return 0 if payouts[position] is not defined
  }
}

export default function Home() {
  const [data, setData] = useState(null);
  const [odds, setOdds] = useState(null);
  const startingHole = 10; // Set the actual starting hole value here

  const options = {
    method: "GET",
    url: "https://live-golf-data.p.rapidapi.com/leaderboard",
    params: { orgId: "1", tournId: "033", year: "2023" },
    headers: {
      "x-rapidapi-key": "4786f7c55amshbe62b07d4f84965p1a07a0jsn6aef3153473b",
      "x-rapidapi-host": "live-golf-data.p.rapidapi.com",
    },
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.request(options);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function scrapeOdds() {
      try {
        const oddsResponse = await axios.get(
          "https://il.sportsbook.fanduel.com/"
        );
        const oddsHtml = oddsResponse.data;
        const oddsRegex = /<span class="iu iv ba ed jc jd ez">(\+?\d+)<\/span>/;
        const oddsMatch = oddsHtml.match(oddsRegex);
        if (oddsMatch) {
          setOdds(oddsMatch[1]);
        }
      } catch (error) {
        console.error("Error scraping odds:", error);
      }
    }
    scrapeOdds();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Tubesteaks @ the Turn</title> // This sets the webpage title
      </Head>
      <h1>Tubesteaks @ the Turn</h1>
      {data && data.leaderboardRows && (
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
            {data.leaderboardRows.map((item, index) => (
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
                    item.currentRound
                  )}
                </td>
                <td>
                  ${" "}
                  {Number(
                    calculateWinnings(item.position, payouts, data).toFixed(2)
                  ).toLocaleString("en-US")}
                </td>
                <td>{odds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
