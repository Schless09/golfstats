import { useEffect, useState } from "react";
import axios from "axios";
import { payouts } from "../data/payouts";
import Head from "next/head";
import { getThruValue } from "../utils/thruValue";
import { calculateWinnings } from "../utils/winnings";
import LeaderboardTable from "../components/LeaderboardTable";

export default function Home() {
  const [data, setData] = useState(null);
  const [odds, setOdds] = useState(null);
  const startingHole = 10;
  const [roundId, setRoundId] = useState("");
  const [roundStatus, setRoundStatus] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const options = {
    method: "GET",
    url: "https://live-golf-data.p.rapidapi.com/leaderboard",
    params: { orgId: "1", tournId: "033", year: "2023" },
    headers: {
      "x-rapidapi-key": "29aabbcfb8mshd6fa28f41aafd67p1ed875jsn2aaaaa0c2423",
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

  useEffect(() => {
    async function fetchRoundData() {
      try {
        const response = await axios.get(
          "https://live-golf-data.p.rapidapi.com/leaderboard",
          {
            params: { orgId: "1", tournId: "033", year: "2023" },
            headers: {
              "x-rapidapi-key":
                "29aabbcfb8mshd6fa28f41aafd67p1ed875jsn2aaaaa0c2423",
              "x-rapidapi-host": "live-golf-data.p.rapidapi.com",
            },
          }
        );
        if (response.status === 200) {
          const lastUpdated = new Date(
            response.data.lastUpdated
          ).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            timeZone: "America/Chicago",
          });
          setRoundId(response.data.roundId);
          setRoundStatus(response.data.roundStatus);
          setLastUpdated(lastUpdated);
        }
      } catch (error) {
        console.error("Error fetching round data:", error);
      }
    }
    fetchRoundData();
  }, []);

  return (
    <div className="container">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Tubesteaks @ the Turn</title>
      </Head>
      <h1 className="text-center">Tubesteaks @ the Turn</h1>
      <h2 className="text-center">PGA Championship</h2>
      <h4 className="text-center">Thu May 18 - Sun May 21, 2023</h4>
      <h5 className="text-center">
        Round {roundId} {roundStatus} - Last Updated: {lastUpdated} CST
      </h5>
      {data && data.leaderboardRows && (
        <LeaderboardTable
          leaderboardRows={data.leaderboardRows}
          startingHole={startingHole}
          payouts={payouts}
          getThruValue={getThruValue}
          calculateWinnings={(position) =>
            calculateWinnings(position, payouts, data)
          }
          odds={odds}
        />
      )}
    </div>
  );
}
