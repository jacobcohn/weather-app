import config from './config';

export default (() => {
  const getRawData = async (zipCode) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units='imperial'&appid=${config.API_KEY}`,
      { mode: 'cors' },
    );
    const rawData = await response.json();
    return rawData;
  };

  const filterRawData = (rawData) => {
    const filteredData = {};
    filteredData.rawData = rawData;
    filteredData.temp = rawData.main.temp;
    // fill in rest here
    return filteredData;
  };

  const getWeather = async (zipCode) => {
    const rawData = await getRawData(zipCode);
    const filteredData = filterRawData(rawData);
    return filteredData;
  };

  return { getWeather };
})();
