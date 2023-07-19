import axios from 'axios';

export const launchesAPI = async () => {
  return await axios.get('https://api.spacexdata.com/v3/launches');
};

export const launchesItemAPI = async (flight_number: any) => {
  return await axios.get(
    `https://api.spacexdata.com/v3/launches/${flight_number}`,
  );
};
