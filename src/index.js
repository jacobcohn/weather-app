import data from './data';
import dom from './dom';

(() => {
  let submittedOnce = false;
  let currentData = null;

  const searchEvent = () => {
    const zipCodeForm = document.getElementById('zipCodeForm');
    const zipCodeInput = document.getElementById('zipCodeInput');

    zipCodeForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      submittedOnce = true;
      dom.hideMainDivs();

      const newZipCode = zipCodeInput.value;
      zipCodeInput.value = '';

      try {
        currentData = await data.getWeather(newZipCode);
        dom.displayWeather(currentData);
      } catch (error) {
        dom.displayError('Please Enter A Valid US Zip Code');
        dom.displayWeather(currentData);
      }
    });
  };

  const switchUnitsEvent = () => {
    document.getElementById('tempSwitchDiv').addEventListener('click', () => dom.tempSwitch(currentData));
  };

  const exitModalEvent = () => {
    document.getElementById('errorModalExitBtn').addEventListener('click', () => dom.switchModalOnOrOff());
  };

  const getAndDisplayInitialWeather = async () => {
    try {
      const initialWeatherData = await data.getWeather('10001');
      currentData = initialWeatherData;
      if (!submittedOnce) dom.displayWeather(initialWeatherData);
    } catch (error) {
      dom.displayError('The Weather App is Not Currently Working. Please Try Again Later.');
    }
  };

  const init = () => {
    searchEvent();
    switchUnitsEvent();
    exitModalEvent();
    getAndDisplayInitialWeather();
  };

  init();
})();
