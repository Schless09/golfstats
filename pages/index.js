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

  return (
    <div className="container">
      <Head>
        <title>Tubesteaks @ the Turn</title>
      </Head>
      <h1>Tubesteaks @ the Turn</h1>
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
