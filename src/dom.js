export default (() => {
  const loadingPhase = () => {
    // notVisible
  };

  const displayWeather = (data) => {
    console.log(data);
    // visible
  };

  const displayError = (message) => {
    console.log(message);
  };

  const changeTempSwitch = () => {};

  return { loadingPhase, displayWeather, displayError, changeTempSwitch };
})();
