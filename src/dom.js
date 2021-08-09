export default (() => {
  const displayWeather = (data) => {
    console.log(data);
  };

  const displayError = () => {
    console.log('Please Enter A Valid US Zip Code.');
  };

  return { displayWeather, displayError };
})();
