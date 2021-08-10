import data from './data';
import dom from './dom';

(() => {
  let submittedOnce = false;

  const events = () => {
    const zipCodeForm = document.getElementById('zipCodeForm');
    const zipCodeInput = document.getElementById('zipCodeInput');

    zipCodeForm.addEventListener('submit', async (event) => {
      submittedOnce = true;
      event.preventDefault();

      const newZipCode = zipCodeInput.value;
      zipCodeInput.value = '';

      try {
        dom.displayWeather(await data.getWeather(newZipCode));
      } catch (error) {
        if (submittedOnce) {
          dom.displayError('Please Enter A Valid US Zip Code');
        } else {
          dom.displayError('Please Try Again Later. Weather App Is Not Currently Working.');
        }
      }
    });
  };

  const getAndDisplayInitialWeather = async () => {
    const initialWeatherData = await data.getWeather('10001');
    if (!submittedOnce) dom.displayWeather(initialWeatherData);
  };

  const init = () => {
    events();
    getAndDisplayInitialWeather();
  };

  init();
})();
