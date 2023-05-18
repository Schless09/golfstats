import axios from 'axios';

export async function getGolfData() {
  const options = {
    method: 'GET',
    url: 'https://live-golf-data.p.rapidapi.com/leaderboard',
    params: {
      orgId: '1',
      tournId: '033',
      year: '2023'
    },
    headers: {
      'X-RapidAPI-Key': '4786f7c55amshbe62b07d4f84965p1a07a0jsn6aef3153473b',
      'X-RapidAPI-Host': 'live-golf-data.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
