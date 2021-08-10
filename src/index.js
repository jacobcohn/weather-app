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
      dom.loadingPhase();

      const newZipCode = zipCodeInput.value;
      zipCodeInput.value = '';

      try {
        currentData = await data.getWeather(newZipCode);
        dom.displayWeather(currentData);
      } catch (error) {
        if (submittedOnce) {
          dom.displayError('Please Enter A Valid US Zip Code');
        } else {
          dom.displayError('Please Try Again Later. Weather App Is Not Currently Working.');
        }
        dom.displayWeather(currentData);
      }
    });
  };

  const switchEvent = () => {
    const switchDiv = document.getElementById('tempSwitchDiv');
    switchDiv.addEventListener('click', () => {
      dom.changeTempSwitch();
      if (currentData) dom.displayWeather(currentData);
    });
  };

  const getAndDisplayInitialWeather = async () => {
    const initialWeatherData = await data.getWeather('10001');
    if (!submittedOnce) dom.displayWeather(initialWeatherData);
  };

  const init = () => {
    searchEvent();
    switchEvent();
    getAndDisplayInitialWeather();
  };

  init();
})();
