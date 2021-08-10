export default (() => {
  const displayWeather = (data) => {
    console.log(data);
  };

  const displayError = (message) => {
    console.log(message);
  };

  return { displayWeather, displayError };
})();
